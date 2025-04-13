import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
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
  @ViewChild('navMain', {static: true}) private  navMain!: ElementRef;

  @Output() onSidenavOpenRequest : EventEmitter<number> = new EventEmitter;
  @Output() onSizeChanged: EventEmitter<number> = new EventEmitter;

  protected smallNavbar : boolean = false;

  constructor (private router: Router) {}

  goToPage(path: string) {
    this.router.navigateByUrl(path)
  }

  protected readonly BasketController = BasketController;

  onResize(event: any) {
    this.smallNavbar = event.target.innerWidth <= 725;
    this.onSizeChanged.emit(this.navMain.nativeElement.offsetHeight);
  }

  isWindowSmall() {
    return window.innerWidth <= 725;
  }

  ngOnInit() {
    this.onSizeChanged.emit(this.navMain.nativeElement.offsetHeight);
  }
}
