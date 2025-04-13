import {ProductDAOInMemory} from '../dao/ProductDAOInMemory';
import {BasketDAO} from '../dao/BasketDAO';
import {BasketDAOInMemory} from '../dao/BasketDAOInMemory';
import {EventEmitter} from '@angular/core';
import {UserBasketItem} from '../model/UserBasketItem';

export class BasketController {

  private static _instance : BasketController|undefined = undefined;
  private _dao : BasketDAO|undefined = undefined;

  constructor(daoType:string) {
    switch (daoType) {
      case "inMemory":
        this._dao = new BasketDAOInMemory();
        break;
    }
  }

  static getInstance(): BasketController {
    if (this._instance == undefined) {
      this._instance = new BasketController("inMemory");
    }
    return this._instance;
  }

  public addItem(newItem: UserBasketItem) {
    if (localStorage.getItem("isLoggedIn") != "true") {
      window.location.href="login"
      return;
    }
    this._dao!.addItem(newItem)
  }

  public removeItem(id: string) {
    this._dao?.removeItem(id);
  }

  public getItemCount(): number {
    return this._dao!.getItemCount();
  }

  public getPriceSum() {
    return this._dao!.getPriceSum();
  }

  public getItems() {
    return this._dao!.getItems();
  }

  public clearBasket() {
    this._dao?.clearBasket();
  }
}
