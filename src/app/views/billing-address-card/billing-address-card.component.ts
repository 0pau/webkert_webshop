import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BillingAddress} from '../../model/BillingAddress';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-billing-address-card',
  imports: [
    MatIcon,
    MatIconButton
  ],
  templateUrl: './billing-address-card.component.html',
  styleUrl: './billing-address-card.component.scss'
})
export class BillingAddressCardComponent {
  @Input() addr: BillingAddress|undefined;
  @Output() onDelete: EventEmitter<BillingAddress> = new EventEmitter();
  @Output() onEditRequested: EventEmitter<BillingAddress> = new EventEmitter();

  del() {
    this.onDelete.emit(this.addr);
  }

  requestEdit() {
    this.onEditRequested.emit(this.addr);
  }

}
