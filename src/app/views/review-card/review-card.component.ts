import {Component, Input} from '@angular/core';
import {ProductReview} from '../../model/ProductReview';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-review-card',
  imports: [
    MatIcon
  ],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent {
  @Input() review : ProductReview|undefined;
}
