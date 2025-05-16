import {Component, inject} from '@angular/core';
import {BasketService} from '../../services/basket.service';
import {UserBasketItem} from '../../model/UserBasketItem';
import {firstValueFrom} from 'rxjs';
import {NgForOf} from '@angular/common';
import {PricePipe} from '../../pipe/PricePipe';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {BillingAddress} from '../../model/BillingAddress';
import {BillingAddressService} from '../../services/billing-address.service';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OrderService} from '../../services/order.service';
import {Order} from '../../model/Order';
import {Router} from '@angular/router';

@Component({
  selector: 'app-place-order',
  imports: [
    NgForOf,
    PricePipe,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckbox,
    MatButton
  ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent {

  protected basket: UserBasketItem[] = [];
  protected selectedAddr : BillingAddress = new BillingAddress();
  protected availAddrs : BillingAddress[] = [];
  protected snackbar = inject(MatSnackBar);

  selectFormControl = new FormControl<BillingAddress|null>(null,null);

  constructor(private router: Router, private basketService: BasketService, private billingAddressService: BillingAddressService, private orderService: OrderService) {
  }

  ngOnInit() {
    firstValueFrom(this.basketService.getBasketItems()).then(r =>{
      this.basket = r;
    });
    firstValueFrom(this.billingAddressService.getAddresses()).then(r=>{
      this.availAddrs = r;
    })
  }

  getWholePrice() {
    let sum = 0;

    for (let itm of this.basket) {
      sum += itm.price*itm.quantity;
    }

    return sum;
  }

  addrSelect(ev: MatSelectChange<any>) {
    this.selectedAddr = {...ev.value} as BillingAddress;
  }

  placeOrder() {

    for (let key in this.selectedAddr) {
      // @ts-ignore
      let a:string = this.selectedAddr[key].toString().trim();
      if (a === "") {
        this.snackbar.open("Töltse ki a szállítási adatokat!","", {
          duration: 2000
        })
        return;
      }
    }

    let o = new Order(this.selectedAddr, new Date(), this.basket, this.getWholePrice(), 0);

    this.orderService.placeOrder(o).then(e=>{
      if (e) {
        this.basketService.clearItems();
        this.router.navigateByUrl("/");
        this.snackbar.open("Sikeres megrendelés!", "", {
          duration:2000
        });
      } else {
        this.snackbar.open("Hiba történt a rendelés leadása során.", "", {
          duration:2000
        });
      }
    })
  }
}
