import {BasketDAO} from './BasketDAO';
import {UserBasketItem} from '../model/UserBasketItem';

export class BasketDAOInMemory implements BasketDAO {

  private items : UserBasketItem[] = [];

  addItem(newItem: UserBasketItem): void {
    for (let item of this.items) {
      if (item.id == newItem.id) {
        item.quantity += newItem.quantity;
        return;
      }
    }
    this.items.push(newItem);
  }

  clearBasket(): void {
    this.items.splice(0, this.items.length);
  }

  getItemCount(): number {
    return this.items.length;
  }

  getItems(): UserBasketItem[] {
    return this.items;
  }

  getPriceSum(): number {

    let sum = 0;
    for (let item of this.items) {
      sum += item.price*item.quantity;
    }

    return sum;
  }

  removeItem(productId: string): void {
    for (let item of this.items) {
      if (item.id == productId) {
        this.items.splice(this.items.indexOf(item), 1);
      }
    }
  }

}
