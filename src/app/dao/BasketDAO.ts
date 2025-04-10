import {UserBasketItem} from '../model/UserBasketItem';

export interface BasketDAO {

  getItemCount():number;
  getPriceSum():number;
  getItems():UserBasketItem[];
  addItem(newItem:UserBasketItem):void;
  removeItem(productId:string):void;
  clearBasket():void;

}
