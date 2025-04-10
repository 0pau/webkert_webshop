import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip'
import { Router } from '@angular/router';
import {BasketController} from '../../controller/BasketController';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatIconButton, MatButton, MatTooltip],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  protected smallNavbar : boolean = false;

  constructor (private router: Router) {}

  goToPage(path: string) {
    this.router.navigateByUrl(path)
  }

  protected readonly BasketController = BasketController;

  onResize(event: any) {
    this.smallNavbar = event.target.innerWidth <= 725;
  }

  isWindowSmall() {
    return window.innerWidth <= 725;
  }

  ngOnInit() {

  }
}
