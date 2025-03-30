import { Component } from '@angular/core';
import { AdBannerComponent } from '../../views/ad-banner/ad-banner.component';
import { ProductCarouselComponent } from '../../views/product-carousel/product-carousel.component';

@Component({
  selector: 'app-home',
  imports: [AdBannerComponent, ProductCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
