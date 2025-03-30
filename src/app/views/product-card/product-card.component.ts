import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PlaceholderComponent } from '../placeholder/placeholder.component';

@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon, MatIconButton, PlaceholderComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

}
