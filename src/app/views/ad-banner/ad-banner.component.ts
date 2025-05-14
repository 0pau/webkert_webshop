import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {MatRipple} from '@angular/material/core';
import {collection, Firestore, getDocs} from '@angular/fire/firestore';

@Component({
  selector: 'app-ad-banner',
  imports: [MatButton, MatRipple],
  templateUrl: './ad-banner.component.html',
  styleUrl: './ad-banner.component.scss'
})
export class AdBannerComponent {
  protected shouldShowSkeleton = true;
  protected obj = {
    title: "",
    text: "",
    id: "",
    conditions: []
  };

  constructor(private firebase: Firestore) {
  }

  ngOnInit() {

    const c = collection(this.firebase, "ads");
    getDocs(c).then(r=>{
      // @ts-ignore
      this.obj = {...r.docs[0].data()};
      this.shouldShowSkeleton = false;
    })

    //this.firebase

  }
}
