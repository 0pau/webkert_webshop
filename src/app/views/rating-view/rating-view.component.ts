import {Component, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {RatingPipe} from '../../pipe/RatingPipe';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-rating-view',
  imports: [
    MatIcon,
    RatingPipe,
    NgClass
  ],
  templateUrl: './rating-view.component.html',
  styleUrl: './rating-view.component.scss'
})
export class RatingViewComponent {
  @Input() value : number = 0;
}
