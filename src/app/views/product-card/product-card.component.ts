import {Component, Input} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PlaceholderComponent } from '../placeholder/placeholder.component';
import { MatRippleModule } from '@angular/material/core';
import {Product} from '../../model/Product'
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon, MatIconButton, PlaceholderComponent, MatRippleModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  constructor(private router: Router) {
  }

  @Input() product: Product | undefined;

  goToProduct() {
    this.router.navigateByUrl(this.product!.id);
  }
}
