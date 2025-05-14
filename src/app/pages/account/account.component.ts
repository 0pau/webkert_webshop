import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../services/auth.service';
import {MatIcon} from '@angular/material/icon';
import {MatRipple} from '@angular/material/core';

@Component({
  selector: 'app-account',
  imports: [
    MatButton,
    MatIcon,
    MatRipple
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  protected authService = inject(AuthService);

  logout() {
    this.authService.signOut();
    window.location.href="/";
  }

}
