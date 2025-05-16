import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {PricePipe} from '../../pipe/PricePipe';
import {AsyncPipe, NgForOf} from '@angular/common';
import {BasketItemComponent} from '../../views/basket-item/basket-item.component';
import {BasketService} from '../../services/basket.service';
import {UserBasketItem} from '../../model/UserBasketItem';
import {update} from '@angular/fire/database';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basket',
  imports: [MatButton, PricePipe, NgForOf, BasketItemComponent, AsyncPipe],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {

  protected basket: UserBasketItem[] = [];

  constructor(protected basketService : BasketService, protected router: Router) {
  }

  clearAll() {
    this.basketService.clearItems().then(r=>{
      this.updateList();
    })
  }

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.basketService.getBasketItems().subscribe(l =>{
      this.basket = l;
    })
  }
}
