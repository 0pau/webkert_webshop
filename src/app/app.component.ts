import {Component, ElementRef, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './common/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {SideMenuComponent} from './views/side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MatSidenavModule, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('navbar', {static: true}) navbar!: NavbarComponent;
  protected navbarHeight: number = 0;

  getNavbarHeight() {
    return this.navbarHeight;
  }
}
