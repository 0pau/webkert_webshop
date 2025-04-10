import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {BasketController} from "../../controller/BasketController";
import {PricePipe} from '../../pipe/PricePipe';
import {NgForOf} from '@angular/common';
import {BasketItemComponent} from '../../views/basket-item/basket-item.component';

@Component({
  selector: 'app-basket',
  imports: [MatButton, PricePipe, NgForOf, BasketItemComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {

    protected readonly BasketController = BasketController;

  clearAll() {
    BasketController.getInstance().clearBasket();
  }
}
