import {BasketDAO} from '../dao/BasketDAO';
import {BasketDAOInMemory} from '../dao/BasketDAOInMemory';
import {FavoritesDAO} from '../dao/FavoritesDAO';

export class FavoritesController {
  private static _instance : FavoritesController|undefined = undefined;
  private _dao : FavoritesDAO|undefined = undefined;

  constructor(daoType:string) {
    switch (daoType) {
      case "inMemory":
        //this._dao = new Fav();
        break;
    }
  }

  static getInstance(): FavoritesController {
    if (this._instance == undefined) {
      this._instance = new FavoritesController("inMemory");
    }
    return this._instance;
  }
}
