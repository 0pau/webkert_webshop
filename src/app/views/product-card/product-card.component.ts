import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PlaceholderComponent } from '../placeholder/placeholder.component';
import { MatRippleModule } from '@angular/material/core';
import {Product} from '../../model/Product'
import {Router} from '@angular/router';
import {PricePipe} from '../../pipe/PricePipe';
import {BasketController} from '../../controller/BasketController';

@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon, MatIconButton, PlaceholderComponent, MatRippleModule, PricePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.product!.discount != 0) {
      this.realPrice = this.product!.price - (this.product!.price*(this.product!.discount/100));
    } else {
      this.realPrice = this.product!.price;
    }
  }

  @Input() product: Product | undefined;
  protected realPrice= 0;

  goToProduct() {
    this.router.navigateByUrl(this.product!.id);
  }

  addToBasket() {
    BasketController.getInstance().addItem(
      {id: this.product!.id, price: this.realPrice, quantity: 1}
    )
  }
}
