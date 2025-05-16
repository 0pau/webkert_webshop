import {Component, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-order-status-graphic',
  imports: [
    MatIcon,
    NgClass
  ],
  templateUrl: './order-status-graphic.component.html',
  styleUrl: './order-status-graphic.component.scss'
})
export class OrderStatusGraphicComponent {
  @Input() status: number = 0;
}
