import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<User|null>;
  public currentUserObj: User|null = null;

  constructor(private auth : Auth, private router: Router) {
    this.currentUser = authState(this.auth);
    this.currentUser.subscribe(user=>{
      this.currentUserObj = user;
    })
    console.log("service started");
  }

  signIn(email:string, password:string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    signOut(this.auth).then(r => {
      this.updateUserStatus(false);
    });
  }

  register(email:string, password:string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  updateUserStatus(status : boolean) {
    localStorage.setItem("isLoggedIn", status.toString());
  }

}
