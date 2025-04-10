import {BasketDAO} from '../dao/BasketDAO';
import {BasketDAOInMemory} from '../dao/BasketDAOInMemory';
import {HistoryDAOInMemory} from '../dao/HistoryDAOInMemory';
import {HistoryDAO} from '../dao/HistoryDAO';

export class HistoryController {
  private static _instance : HistoryController|undefined = undefined;
  private _dao : HistoryDAO|undefined = undefined;

  constructor(daoType:string) {
    switch (daoType) {
      case "inMemory":
        this._dao = new HistoryDAOInMemory();
        break;
    }
  }

  static getInstance(): HistoryController {
    if (this._instance == undefined) {
      this._instance = new HistoryController("inMemory");
    }
    return this._instance;
  }

  public addItem(id: string) {
    this._dao!.addItem(id);
  }

  public clear() {
    this._dao!.clear();
  }

  public getItems():string[]{
    return this._dao!.getItems();
  }

  public size() {
    return this._dao!.size();
  }
}
