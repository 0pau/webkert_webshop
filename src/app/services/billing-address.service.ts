import { Injectable } from '@angular/core';
import {doc, Firestore, getDoc, updateDoc} from '@angular/fire/firestore';
import {BillingAddress} from '../model/BillingAddress';
import {AuthService} from './auth.service';
import {firstValueFrom, of, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingAddressService {

  constructor(private authService : AuthService, private firestore : Firestore) { }

  getAddresses() {
    return this.authService.currentUser.pipe(switchMap(async user =>{
      let billingAddresses: BillingAddress[] = [];
      if (user == null) {
        return of([]);
      }
      const ref = doc(this.firestore, "userData", user.uid);
      const e = await getDoc(ref);
      if (!e.exists() && e.data() !== undefined) {
        return of([]);
      }
      // @ts-ignore
      for (let i of e.data()["billingAddresses"]) {
        billingAddresses.push({...i} as BillingAddress);
      }
      return of(billingAddresses);
    }), switchMap(billingAddresses => billingAddresses));
  }

  async addBillingAddress(addr: BillingAddress) {
    let list = await firstValueFrom(this.getAddresses());
    for (let a of list) {
      if (JSON.stringify(a) === JSON.stringify(addr)) {
        return false;
      }
    }
    list.push(addr);
    await this.commitList(list);
    return true;
  }

  async commitList(list: BillingAddress[]) {
    let user = await firstValueFrom(this.authService.currentUser);
    if (user === null) {
      return false;
    }
    const docRef = doc(this.firestore, "userData", user.uid);
    await updateDoc(docRef, "billingAddresses", list);
    return true;
  }
}
