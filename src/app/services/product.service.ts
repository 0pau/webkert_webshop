import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable, of, switchMap} from 'rxjs';
import {Product} from '../model/Product';
import {collection, doc, Firestore, getDoc, getDocs, limit, query, where} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Condition} from '../model/Condition';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore : Firestore, private authService: AuthService) { }

  getProducts(conditions:Condition[], lim: number = -1): Observable<Product[]> {

    return this.authService.currentUser.pipe(switchMap(async user => {
      let list:Product[] = [];

      const c = collection(this.firestore, "products");
      let q = query(c);
      if (lim !== -1) {
        q = query(q, limit(lim))
      }
      for (const condition of conditions) {
        q = query(q, where(condition.leftOperand, condition.operator, condition.rightOperand));
      }
      (await getDocs(q)).forEach(doc => {
        list.push({...doc.data()} as Product);
      })
      return of(list);

    }), switchMap(list => list));

  }

  async getProductById(id: string): Promise<Product|null> {

    const result = await getDoc(doc(this.firestore, "products", id));

    if (!result.exists()) {
      return null;
    }

    return {...result.data()} as Product;

  }

}
