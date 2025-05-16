import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DateFormatterPipe} from "../../pipe/date-formatter.pipe";
import {MatIconButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {OrderStatusGraphicComponent} from "../order-status-graphic/order-status-graphic.component";
import {PricePipe} from "../../pipe/PricePipe";
import {StatusPipePipe} from "../../pipe/status-pipe.pipe";
import {MatIcon} from '@angular/material/icon';
import {Order} from '../../model/Order';

@Component({
  selector: 'app-order-card',
    imports: [
        DateFormatterPipe,
        MatIcon,
        MatIconButton,
        NgForOf,
        OrderStatusGraphicComponent,
        PricePipe,
        StatusPipePipe
    ],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  @Input() order: Order|undefined;
  @Output() deleteRequest: EventEmitter<Order> = new EventEmitter();
}
