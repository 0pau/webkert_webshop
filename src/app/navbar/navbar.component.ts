import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatIconButton, MatButton, MatTooltip],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor (private router: Router) {}

  goToPage(path: string) {
    this.router.navigateByUrl(path)
  }
}
