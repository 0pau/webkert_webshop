import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {firstValueFrom, Observable, of, switchMap} from 'rxjs';
import {doc, Firestore, getDoc, setDoc, updateDoc} from '@angular/fire/firestore';
import {UserBasketItem} from '../model/UserBasketItem';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  public itemCount = 0;
  public price = 0;

  constructor(private firebase: Firestore, private authService : AuthService) {}

  async repairBasketIfNotExists(forced = false) {
    let user = await firstValueFrom(this.authService.currentUser);
    if (user === null) {
      return;
    }
    const ref = doc(this.firebase, "userBaskets", user.uid);
    if (!(await getDoc(ref)).exists() || forced) {
      console.log("Basket does not exist in the database. Repairing...")
      await setDoc(ref, {items: []});
    }
  }

  async addItem(item: UserBasketItem) {
    let user = await firstValueFrom(this.authService.currentUser);
    if (user === null) {
      window.location.href = "/login";
      return;
    }
    await this.repairBasketIfNotExists();
    const ref = doc(this.firebase, "userBaskets", user.uid);
    let d = (await getDoc(ref)).data();
    if (!d) {
      return false;
    }
    let found = false;
    for (let p of d["items"]) {
      if (p["id"] === item["id"]) {
        found = true;
        p.quantity += 1;
      }
    }

    if (!found) {
      d["items"].push(item);
    }

    console.log(d["items"])

    this.itemCount = d["items"].length;

    await setDoc(ref, d);
    await this.refreshItemCount();

    return true;
  }

  async refreshItemCount() {
    let user = await firstValueFrom(this.authService.currentUser);
    if (user === null) {
      this.itemCount = 0;
      return;
    }
    const ref = doc(this.firebase, "userBaskets", user.uid);
    let d = (await getDoc(ref));
    if (!d.exists()) {
      this.itemCount = 0;
      return;
    }
    this.itemCount = d.data()["items"].length;
    this.price = 0;
    for (let i of d.data()["items"]) {
      this.price += i.price*i.quantity;
    }
  }

  getBasketItems() : Observable<UserBasketItem[]> {
    return this.authService.currentUser.pipe(switchMap(async user =>{
      let list : UserBasketItem[] = [];

      if (user !== null) {
        const userID = user.uid;

        const ref = doc(this.firebase, "userBaskets", userID);
        const result = await getDoc(ref);
        if (result.exists()) {
          list = result.data()["items"];
        }

      }
      return of(list);
    }), switchMap(list=>list))
  }

  async removeItem(itemID:string) {
    let user = await firstValueFrom(this.authService.currentUser);
    if (user === null) {
      return;
    }
    const ref = doc(this.firebase, "userBaskets", user.uid);
    let d = (await getDoc(ref));
    if (!d.exists()) {
      return false;
    }
    let index = 0;
    for (let i of d.data()["items"]) {
      if (i.id == itemID) {
        break;
      }
      index++;
    }
    let items = d.data()["items"];
    items.splice(index, 1);
    await updateDoc(ref, "items", items);
    await this.refreshItemCount();
    return true;
  }

  async clearItems() {
    await this.repairBasketIfNotExists(true);
    await this.refreshItemCount();
  }
}
