import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../model/Product';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {ProductCarouselComponent} from '../../views/product-carousel/product-carousel.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {RatingViewComponent} from '../../views/rating-view/rating-view.component';
import {PricePipe} from '../../pipe/PricePipe';
import {NumericUpDownComponent} from '../../views/numeric-up-down/numeric-up-down.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserBasketItem} from '../../model/UserBasketItem';
import {FormsModule} from '@angular/forms';
import {SpecSheetComponent} from '../../views/spec-sheet/spec-sheet.component';
import {Title} from '@angular/platform-browser';
import {NotFoundComponent} from '../not-found/not-found.component';
import {NgForOf} from '@angular/common';
import {ReviewCardComponent} from '../../views/review-card/review-card.component';
import {ProductService} from '../../services/product.service';
import {ProductReview} from '../../model/ProductReview';
import {RatingsService} from '../../services/ratings.service';
import {FavoritesService} from '../../services/favorites.service';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-product-page',
  imports: [
    MatIcon,
    MatButton,
    ProductCarouselComponent,
    MatProgressSpinner,
    RatingViewComponent,
    PricePipe,
    NumericUpDownComponent,
    FormsModule,
    SpecSheetComponent,
    NotFoundComponent,
    NgForOf,
    ReviewCardComponent,
    MatIconButton
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  protected id : string = "??";

  protected isWorking = true;
  protected isFavorite = false;

  private title = inject(Title);
  protected reviews : ProductReview[] = [];

  protected product : Product = {} as Product;
  protected productNotFound : boolean = false;

  protected basketItem : UserBasketItem|undefined = undefined;

  private _snackBar : MatSnackBar = inject(MatSnackBar);

  constructor(private route: ActivatedRoute, private productService : ProductService, private ratingsService: RatingsService, private favoritesService: FavoritesService, private basketService: BasketService) {
    this.id = route.snapshot.paramMap.get("id")!;

    productService.getProductById(this.id).then(p =>{
      if (p === null) {
        this.productNotFound = true;
      } else {
        console.log(p);
        this.product = p;

        let price = this.product.price;
        if (this.product.discount != 0) {
          price = price-(price*(this.product.discount/100));
        }

        this.basketItem = new UserBasketItem(this.product.id, price, 1);
        this.basketItem = {...this.basketItem}as UserBasketItem;
        this.title.setTitle(this.product.name + " | VoltVault");
        this.isWorking = false;
        ratingsService.getRatingsForProduct(this.id).subscribe(e=>{
          this.reviews = e;
        })
      }
    });

    favoritesService.isProductMyFavorite(this.id).then(r=>{
      this.isFavorite = r;
    })
  }

  ngOnInit() {
    document.documentElement.scrollTo(0,0);
  }

  showSnackbar(message: string) {
    this._snackBar.open(message, "", {
      duration: 1500
    });
  }

  addToBasket() {
    this.basketService.addItem(this.basketItem!).then(r=>{
      this._snackBar.open("A termék a kosárhoz lett adva", "", {
        duration: 1500
      })
    })
  }

  protected readonly alert = alert;
  protected readonly isNaN = isNaN;

  toggleFav() {
    this.favoritesService.toggleFavorite(this.product!.id).then(r=>{
      this.isFavorite = (r==1);
    });
  }
}
