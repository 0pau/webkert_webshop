import { Component } from '@angular/core';
import {FavoritesService} from '../../services/favorites.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Product} from '../../model/Product';
import {ProductService} from '../../services/product.service';
import {ProductCardComponent} from '../../views/product-card/product-card.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-my-favorites',
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    ProductCardComponent,
    MatProgressSpinner,
  ],
  templateUrl: './my-favorites.component.html',
  styleUrl: './my-favorites.component.scss'
})
export class MyFavoritesComponent {
  private favlist : Product[] = [];
  protected isWorking = true;

  constructor(protected favoritesService: FavoritesService, protected productService : ProductService) {
    this.favoritesService.getFavoriteProducts().subscribe(async r=>{
      this.favlist = [];
      for (let id of r) {
        let product = await productService.getProductById(id);
        if (product !== null) {
          this.favlist.push(product);
        }
      }
      this.isWorking = false;
    })
  }

  getList(): Product[] {
    return this.favlist;
  }

}
