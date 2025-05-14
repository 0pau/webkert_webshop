import { Injectable } from '@angular/core';
import {collection, Firestore, getDocs, query, where} from '@angular/fire/firestore';
import {Observable, of, switchMap} from 'rxjs';
import {ProductReview} from '../model/ProductReview';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private authService: AuthService, private firebase : Firestore) {}

  getRatingsForProduct(id: string, limit = -1) : Observable<ProductReview[]> {

    return this.authService.currentUser.pipe(switchMap(async user=>{

      let reviews : ProductReview[] = [];

      const ref = collection(this.firebase, "productReviews");
      const q = query(ref, where("product", "==", id));
      const result = await getDocs(q);
      result.forEach(e=>{
        reviews.push({...e.data()} as ProductReview);
      })

      return of(reviews);

    }), switchMap(reviews => reviews));

  }
}
