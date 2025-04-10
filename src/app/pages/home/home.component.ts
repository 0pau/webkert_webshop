import { Component } from '@angular/core';
import { AdBannerComponent } from '../../views/ad-banner/ad-banner.component';
import { ProductCarouselComponent } from '../../views/product-carousel/product-carousel.component';
import {Product} from '../../model/Product';
import {ProductController} from '../../controller/ProductController';
import {Condition} from '../../model/Condition';
import {HistoryController} from '../../controller/HistoryController';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AdBannerComponent, ProductCarouselComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  getNewProducts() : Product[] {

    let d5 = new Date();
    d5.setDate(d5.getDate()-5);

    return ProductController.getInstance().find([
      new Condition("addDate", ">", d5.getTime().toString())
    ], 8);
  }

  getDiscountedProducts() : Product[] {
    return ProductController.getInstance().find([
      new Condition("discount", ">", "0", "number")
    ], 8)
  }

  getHistory() : Product[] {

    let ret: Product[] = [];

    let c = 0;
    for (let i of HistoryController.getInstance().getItems()) {
      if (c == 4) break;
      let p = ProductController.getInstance().getProductById(i);
      if (p === undefined) continue;
      ret.push(p);
      c++;
    }

    return ret;

  }

  protected readonly HistoryController = HistoryController;
}
