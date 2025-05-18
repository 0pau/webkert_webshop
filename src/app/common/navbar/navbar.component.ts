import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip'
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BasketService} from '../../services/basket.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatIconButton, MatButton, MatTooltip, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('navMain', {static: true}) private  navMain!: ElementRef;

  @Output() onSidenavOpenRequest : EventEmitter<number> = new EventEmitter;
  @Output() onSizeChanged: EventEmitter<number> = new EventEmitter;

  protected smallNavbar : boolean = false;
  protected queryStr = "";
  protected currentURL = "";

  constructor (private router: Router, protected basketService: BasketService) {}

  goToUser() {
    if (localStorage.getItem("isLoggedIn") == "true") {
      this.goToPage("account");
    } else {
      this.goToPage("login");
    }
  }

  goToSearch(event: any) {
    this.goToPage("search/"+this.queryStr);
  }

  goToPage(path: string) {
    this.router.navigateByUrl(path)
  }

  onResize(event: any) {
    this.smallNavbar = event.target.innerWidth <= 725;
    this.onSizeChanged.emit(this.navMain.nativeElement.offsetHeight);
  }

  isWindowSmall() {
    return window.innerWidth <= 725;
  }

  ngOnInit() {
    setTimeout(()=>{
      this.onSizeChanged.emit(this.navMain.nativeElement.offsetHeight);
    }, 100);
    this.basketService.refreshItemCount();

    this.router.events.subscribe(event =>{
      if (event instanceof NavigationEnd) {
        let ev = event as NavigationEnd;
        if (!ev.urlAfterRedirects.includes("search")) {
          this.queryStr = "";
        }
        this.currentURL = ev.urlAfterRedirects;
      }
    })
  }
}
