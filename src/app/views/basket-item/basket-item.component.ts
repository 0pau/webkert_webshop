import {Component, Input} from '@angular/core';
import {Product} from '../../model/Product';
import {ProductController} from '../../controller/ProductController';
import {BasketController} from '../../controller/BasketController';
import {PricePipe} from '../../pipe/PricePipe';
import {UserBasketItem} from '../../model/UserBasketItem';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-basket-item',
  imports: [
    PricePipe,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.scss'
})
export class BasketItemComponent {
  @Input() item: UserBasketItem|undefined = undefined;
  protected product : Product|undefined = undefined;

  ngOnInit() {
    this.product = ProductController.getInstance().getProductById(this.item!.id);
  }

  remove() {
    BasketController.getInstance().removeItem(this.item!.id);
  }
}
