import {BillingAddress} from './BillingAddress';
import {UserBasketItem} from './UserBasketItem';
import {user} from '@angular/fire/auth';

export class Order {
  billingAddress : BillingAddress = new BillingAddress();
  date: Date = new Date();
  items: UserBasketItem[] = [];
  price: number = 0;
  status: number = 0;
  user: string = "";
  id: string = "";


  constructor(billingAddress: BillingAddress = new BillingAddress(), date: Date = new Date(), items: UserBasketItem[] = [], price: number = 0, status: number = 0, user: string = "") {
    this.billingAddress = billingAddress;
    this.date = date;
    this.items = items;
    this.price = price;
    this.status = status;
    this.user = user;
  }
}
