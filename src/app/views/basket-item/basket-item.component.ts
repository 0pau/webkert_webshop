import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../model/Product';
import {PricePipe} from '../../pipe/PricePipe';
import {UserBasketItem} from '../../model/UserBasketItem';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {ProductService} from '../../services/product.service';
import {BasketService} from '../../services/basket.service';

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
  @Output() deleteEvent : EventEmitter<any> = new EventEmitter();
  protected product : Product|null = null;

  constructor(private productService : ProductService, private basketService : BasketService) {
  }

  async ngOnInit() {
    this.product = await this.productService.getProductById(this.item!.id);
  }

  remove() {
    //BasketController.getInstance().removeItem(this.item!.id);
    this.basketService.removeItem(this.item!.id).then(r=>{
      this.deleteEvent.emit()
    })
  }
}
