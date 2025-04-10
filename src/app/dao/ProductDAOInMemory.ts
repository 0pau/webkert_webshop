import {ProductDAO} from './ProductDAO';
import {Product} from '../model/Product';
import {Constants} from '../constants';
import {Condition} from '../model/Condition';

export class ProductDAOInMemory implements ProductDAO {
  getProductById(id: string): Product | undefined {
    for (let product of Constants.allProducts) {
      if (product.id === id) {
        return product;
      }
    }
    return undefined;
  }

  find(conditions: Condition[], limit:number): Product[] {

    let ret : Product[] = [];

    for (let p of Constants.allProducts) {
      let canAdd = false;
      for (const cond of conditions) {
        let left = cond.leftOperand as keyof typeof p;
        if (p[left] !== undefined) {
          canAdd = cond.do(p[left].toString()!);
          if (!canAdd) {
            break;
          }
        } else {
          canAdd = true;
        }
      }

      if (canAdd) {
        ret.push(p);
      }

      if (ret.length == limit) {
        break;
      }

    }
    return ret;
  }
}
