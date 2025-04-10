import {Product} from '../model/Product';
import {ProductDAO} from '../dao/ProductDAO';
import {ProductDAOInMemory} from '../dao/ProductDAOInMemory';
import {Condition} from '../model/Condition';

export class ProductController {

  private static _instance : ProductController|undefined = undefined;
  private _dao: ProductDAO | undefined;

  constructor(daoType:string) {
    switch (daoType) {
      case "inMemory":
        this._dao = new ProductDAOInMemory();
        break;
    }
  }

  static getInstance(): ProductController {
    if (this._instance == undefined) {
      this._instance = new ProductController("inMemory");
    }
    return this._instance;
  }

  public getProductById(id:string):Product|undefined {
    return this._dao?.getProductById(id);
  }

  public find(conditions:Condition[], limit: number = -1) : Product[] {
    return this._dao!.find(conditions, limit);
  }

}
