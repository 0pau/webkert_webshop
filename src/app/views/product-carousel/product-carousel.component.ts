import {ChangeDetectorRef, Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ProductCardComponent} from '../product-card/product-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {Product} from '../../model/Product';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-product-carousel',
  imports: [MatIconButton, MatIcon, ProductCardComponent, NgIf, NgForOf],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.scss'
})
export class ProductCarouselComponent {

  constructor() {

  }

  private page : number = 0;

  private cdRef = inject(ChangeDetectorRef);

  @Input() productList:Observable<Product[]> = new Observable<Product[]>();
  @Input() headTitle:string = "";
  products : Product[] = [];

  @ViewChild('scroller', {static: true}) scroller!: ElementRef;

  ngOnInit() {
    this.productList.subscribe(items =>{
      this.products = items;
    })
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  private getMaxPages() {
    return Math.floor(this.products.length / this.getCols());
  }

  private getCols() {
    let w = window.innerWidth;
    if (w > 900) {
      return 4;
    } else if (w <= 900 && w > 700) {
      return 3;
    } else if (w <= 700 && w > 500) {
      return 2;
    }
    return 1;
  }

  public rightPagerClick() {
    if (this.page < this.getMaxPages()) {
      this.scrollTo(1);
    }
  }

  public leftPagerClick() {
    if (this.page > 0) {
      this.scrollTo(-1);
    }
  }

  private scrollTo(direction:number) {
    this.page += direction;
    let pos = this.scroller?.nativeElement.children[this.page*this.getCols()].offsetLeft;
    this.scroller?.nativeElement.scroll({left: pos, behavior: 'smooth' });
  }

  public shouldShowPagers() : boolean {
    return !this.isWindowSmall() && (this.scroller?.nativeElement.children.length > this.getCols());
  }

  public isWindowSmall() {
    return window.innerWidth<=500;
  }

  resizeEvent(event:any) {
      this.page = 0;
      this.scroller?.nativeElement.scroll({left: 0});
  }
}
