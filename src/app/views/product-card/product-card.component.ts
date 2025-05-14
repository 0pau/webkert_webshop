import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PlaceholderComponent } from '../placeholder/placeholder.component';
import { MatRippleModule } from '@angular/material/core';
import {Product} from '../../model/Product'
import {Router} from '@angular/router';
import {PricePipe} from '../../pipe/PricePipe';
import {FavoritesService} from '../../services/favorites.service';
import {AuthService} from '../../services/auth.service';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon, MatIconButton, PlaceholderComponent, MatRippleModule, PricePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  protected isFavorite = false;

  constructor(private basketService: BasketService, private router: Router, private favoritesService: FavoritesService, protected authService: AuthService) {
  }

  ngOnInit() {
    if (!isNaN(this.product!.discount) && this.product!.discount != 0) {
      this.realPrice = this.product!.price - (this.product!.price*(this.product!.discount/100));
    } else {
      this.realPrice = this.product!.price;
    }
    this.updateFavoriteBtn();
  }

  updateFavoriteBtn() {
    this.favoritesService.isProductMyFavorite(this.product!.id).then(r=>{
      this.isFavorite=r;
    })
  }

  toggleFav() {
    this.favoritesService.toggleFavorite(this.product!.id).then(r=>{
      this.isFavorite = (r==1);
    });
  }

  @Input() product: Product | undefined;


  protected realPrice= 0;

  goToProduct() {
    this.router.navigateByUrl(this.product!.id);
  }

  addToBasket() {
    this.basketService.addItem({id: this.product!.id, price: this.realPrice, quantity: 1});
  }

    protected readonly NaN = NaN;
  protected readonly isNaN = isNaN;
}
