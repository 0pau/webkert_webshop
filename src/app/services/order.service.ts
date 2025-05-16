import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {addDoc, collection, deleteDoc, doc, Firestore, getDocs, query, setDoc, where} from '@angular/fire/firestore';
import {firstValueFrom, of, switchMap} from 'rxjs';
import {Order} from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private authService: AuthService, private firestore: Firestore) {}

  getMyOrders() {

    return this.authService.currentUser.pipe(switchMap(async user => {
      let orders: Order[] = [];

      if (user === null) {
        return of([]);
      }

      const collectionRef = collection(this.firestore, "orders");
      let q = query(collectionRef, where("user", "==", user.uid));
      let result = await getDocs(q);
      result.forEach(item => {
        if (item.data() === undefined && !item.exists()) {
          return;
        }
        orders.push({...item.data(), id: item.id} as Order)
      })

      return of(orders);
    }), switchMap(orders => orders));
  }

  async deleteOrder(orderID: string) {

    let user = await firstValueFrom(this.authService.currentUser);

    if (user === null) {
      return false;
    }

    const docRef = doc(this.firestore, "orders", orderID);
    await deleteDoc(docRef);

    return true;

  }

  async placeOrder(order: Order) {

    let user = await firstValueFrom(this.authService.currentUser);

    if (user === null) {
      return false;
    }
    order.user = user.uid;
    const ref = collection(this.firestore, "orders");
    try {
      await addDoc(ref, {...order});
    } catch (e) {
      console.log(e);
      return false;
    }

    return true;
  }
}
