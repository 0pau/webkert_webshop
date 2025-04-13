import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../model/Product';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {ProductCarouselComponent} from '../../views/product-carousel/product-carousel.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {ProductController} from '../../controller/ProductController';
import {RatingViewComponent} from '../../views/rating-view/rating-view.component';
import {PricePipe} from '../../pipe/PricePipe';
import {NumericUpDownComponent} from '../../views/numeric-up-down/numeric-up-down.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserBasketItem} from '../../model/UserBasketItem';
import {FormsModule} from '@angular/forms';
import {BasketController} from '../../controller/BasketController';
import {SpecSheetComponent} from '../../views/spec-sheet/spec-sheet.component';
import {Title} from '@angular/platform-browser';
import {NotFoundComponent} from '../not-found/not-found.component';
import {HistoryController} from '../../controller/HistoryController';
import {NgForOf} from '@angular/common';
import {ReviewCardComponent} from '../../views/review-card/review-card.component';

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
    ReviewCardComponent
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  protected id : string = "??";

  private title = inject(Title);

  protected product : Product;
  protected productNotFound : boolean = false;

  protected basketItem : UserBasketItem|undefined = undefined;

  private _snackBar : MatSnackBar = inject(MatSnackBar);

  constructor(private route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get("id")!;

    var p = ProductController.getInstance().getProductById(this.id);
    this.product = p!;

    if (p === undefined) {
      this.productNotFound = true;
      return;
    }

    this.product.loadReviews();

    let price = this.product.price;
    if (this.product.discount != 0) {
      price = price-(price*(this.product.discount/100));
    }

    this.basketItem = new UserBasketItem(this.product.id, price, 1);
    this.title.setTitle(this.product.name + " | VoltVault");
    HistoryController.getInstance().addItem(this.id);
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
    BasketController.getInstance().addItem(this.basketItem!);
    this._snackBar.open("A termék a kosárhoz lett adva", "", {
      duration: 1500
    })
  }

  protected readonly alert = alert;
}
