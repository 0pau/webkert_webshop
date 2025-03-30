import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-carousel',
  imports: [MatButton, MatIconButton, MatIcon, MatFabButton, ProductCardComponent],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.scss'
})
export class ProductCarouselComponent {
  private cols : number = 4;
  private page : number = 0;
  private maxPages : number = 0;

  @ViewChild('scroller', {static: true}) scroller!: ElementRef;

  ngOnInit() {
    this.maxPages = Math.floor(this.scroller?.nativeElement.children.length / 4);
  }

  public rightPagerClick() {
    if (this.page < this.maxPages) {
      this.page++;
      this.scroller?.nativeElement.scroll({left: this.page*this.cols*(250-12), behavior: 'smooth' });
    }
  }

  public leftPagerClick() {
    console.log(this.scroller?.nativeElement.children.length);
    if (this.page != 0) {
      this.page--;
      this.scroller?.nativeElement.scroll({left: this.page*this.cols*(250-12), behavior: 'smooth' });
    }
  }
}
