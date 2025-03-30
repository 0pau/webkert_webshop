import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button'
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [MatButton],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  constructor(private router: Router) {}

  public goHome() {
    this.router.navigateByUrl("");
  }

}
