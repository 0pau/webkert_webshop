import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {doc, Firestore, getDoc, updateDoc} from '@angular/fire/firestore';
import {firstValueFrom, Observable, of, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private authService:AuthService, private firebase: Firestore) { }

  async isProductMyFavorite(id: string) {
    if (this.authService.currentUserObj === null) {
      return false;
    }

    const userID = this.authService.currentUserObj.uid;
    const ref = doc(this.firebase, "userFavorites", userID);
    const result = await getDoc(ref);

    if (!result.exists()) {
      return false;
    }

    // @ts-ignore
    return result.data()["items"].includes(id);
  }

  async toggleFavorite(id:string) {

    if (this.authService.currentUserObj === null) {
      return -1;
    }

    let favList = await firstValueFrom(this.getFavoriteProducts());
    let result = 0;
    if (favList.includes(id)) {
      favList.splice(favList.indexOf(id),1);
    } else {
      favList.push(id);
      result = 1;
    }

    const docRef = doc(this.firebase, "userFavorites", this.authService.currentUserObj.uid);
    await updateDoc(docRef, "items", favList);

    return result;

  }

  getFavoriteProducts() : Observable<string[]> {
    return this.authService.currentUser.pipe(switchMap(async user =>{
      let list : string[] = [];

      if (user !== null) {
        const userID = user.uid;

        const ref = doc(this.firebase, "userFavorites", userID);
        const result = await getDoc(ref);
        if (result.exists()) {
          list = result.data()["items"];
        }

      }
      return of(list);
    }), switchMap(list=>list))
  }
}
