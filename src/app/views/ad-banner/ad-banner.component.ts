import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {MatRipple} from '@angular/material/core';

@Component({
  selector: 'app-ad-banner',
  imports: [MatButton, MatRipple],
  templateUrl: './ad-banner.component.html',
  styleUrl: './ad-banner.component.scss'
})
export class AdBannerComponent {

}
