import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './common/navbar/navbar.component';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {SideMenuComponent} from './views/side-menu/side-menu.component';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MatSidenavModule, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('navbar', {static: true}) navbar!: NavbarComponent;
  @ViewChild('categoriesSidenav') sidenav!:MatSidenav;
  protected navbarHeight: number = 0;
  private authService = inject(AuthService);

  getNavbarHeight() {
    return this.navbarHeight;
  }

  closeMenu() {
    this.sidenav.close();
  }
}
