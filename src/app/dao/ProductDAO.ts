import {Product} from '../model/Product';
import {Condition} from '../model/Condition';

export interface ProductDAO {

  getProductById(id: string) : Product|undefined;

  find(conditions: Condition[], limit: number) : Product[];

}
