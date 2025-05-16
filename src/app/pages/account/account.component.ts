import {Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {AuthService} from '../../services/auth.service';
import {MatIcon} from '@angular/material/icon';
import {MatRipple} from '@angular/material/core';
import {NgClass, NgForOf} from '@angular/common';
import {collection, doc, Firestore, getDoc} from '@angular/fire/firestore';
import {BillingAddress} from '../../model/BillingAddress';
import {BillingAddressService} from '../../services/billing-address.service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {BillingAddressCardComponent} from '../../views/billing-address-card/billing-address-card.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {BillingAddressEditorComponent} from '../../views/billing-address-editor/billing-address-editor.component';
import {firstValueFrom} from 'rxjs';
import {Order} from '../../model/Order';
import {OrderService} from '../../services/order.service';
import {DateFormatterPipe} from '../../pipe/date-formatter.pipe';
import {OrderStatusGraphicComponent} from '../../views/order-status-graphic/order-status-graphic.component';
import {StatusPipePipe} from '../../pipe/status-pipe.pipe';
import {PricePipe} from '../../pipe/PricePipe';
import {OrderCardComponent} from '../../views/order-card/order-card.component';

@Component({
  selector: 'app-account',
  imports: [
    MatButton,
    MatIcon,
    MatRipple,
    NgClass,
    MatIconButton,
    NgForOf,
    MatProgressSpinner,
    BillingAddressCardComponent,
    DateFormatterPipe,
    OrderStatusGraphicComponent,
    StatusPipePipe,
    PricePipe,
    OrderCardComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  protected authService = inject(AuthService);
  protected firestore = inject(Firestore);
  private billingAddressService = inject(BillingAddressService);
  private orderService = inject(OrderService);
  protected currentView = "";
  protected billingAddresses : BillingAddress[] = [];
  protected orderList : Order[] = [];
  protected isWorking = true;
  private _snackBar : MatSnackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  logout() {
    this.authService.signOut();
    window.location.href="/";
  }

  ngOnInit() {
    this.switchPane("addresses");
  }

  switchPane(paneName: string) {
    this.currentView = paneName;
    if (paneName == "addresses") {
      this.getAddresses();
    } else if (paneName == "orders") {
      this.getOrders();
    }
  }

  getOrders() {
    this.isWorking = true;
    this.orderService.getMyOrders().subscribe(list=>{
      this.isWorking = false;
      this.orderList = list;
    });
  }

  getAddresses() {
    this.isWorking = true;
    this.billingAddressService.getAddresses().subscribe(e=>{
      this.billingAddresses = e;
      this.isWorking = false;
    })
  }

  editAddr(item: BillingAddress) {
    firstValueFrom(this.dialog.open(BillingAddressEditorComponent, {
      data: item
    }).beforeClosed()).then(e=>{
      if (e === null) {
        return;
      }
      for (let key in e) {
        // @ts-ignore
        item[key] = e[key];
      }
      this.billingAddressService.commitList(this.billingAddresses);
    })
  }

  newItem() {
    let item = new BillingAddress();
    firstValueFrom(this.dialog.open(BillingAddressEditorComponent, {
      data: item
    }).beforeClosed()).then(e=>{
      if (e != null) {
        item = {...e} as BillingAddress;
        this.billingAddresses.push(item);
        this.billingAddressService.commitList(this.billingAddresses);
      }
    })
  }

  deleteItem(item: BillingAddress) {
    this.billingAddresses.splice(this.billingAddresses.indexOf(item),1);
    this.billingAddressService.commitList(this.billingAddresses).then(e=>{
      if (e) {
        this._snackBar.open("Sikeres törlés!", "", {
          duration: 2000
        });
      }
    });
  }

  deleteOrder(order: Order) {

    if (order.status > 0) {
      this._snackBar.open("Ez a rendelés már nem vonható vissza.", "", {
        duration: 2000
      });
      return;
    }

    this.orderList.splice(this.orderList.indexOf(order), 1);
    this.orderService.deleteOrder(order.id).then(e=>{
      if (e) {
        this._snackBar.open("Sikeres törlés!", "", {
          duration: 2000
        });
      }
    });
  }

}
