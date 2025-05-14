import { Component } from '@angular/core';
import { AdBannerComponent } from '../../views/ad-banner/ad-banner.component';
import { ProductCarouselComponent } from '../../views/product-carousel/product-carousel.component';
import {Product} from '../../model/Product';
import {Condition} from '../../model/Condition';
import {NgIf} from '@angular/common';
import {Observable, of} from 'rxjs';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [AdBannerComponent, ProductCarouselComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(protected productService : ProductService) {
  }

  getNewProducts() : Observable<Product[]> {

    return this.productService.getProducts([], 5);
  }

  getDiscountedProducts() : Observable<Product[]> {
    return this.productService.getProducts(
      [new Condition("discount", "!=", "0", "number")]
    );
  }

  protected readonly ProductService = ProductService;
}
