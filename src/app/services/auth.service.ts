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
import {doc, Firestore, setDoc, updateDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<User|null>;
  public currentUserObj: User|null = null;

  constructor(private auth : Auth, private router: Router, private firestore: Firestore) {
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

  async register(email:string, password:string) {

    let regResult = null;

    try {
      regResult = await createUserWithEmailAndPassword(this.auth, email, password);
      let newDocRef = doc(this.firestore, "userData", regResult.user.uid);
      await setDoc(newDocRef, {billingAddresses: []});
      newDocRef = doc(this.firestore, "userFavorites", regResult.user.uid);
      await setDoc(newDocRef, {items: []});
      newDocRef = doc(this.firestore, "userBaskets", regResult.user.uid);
      await setDoc(newDocRef, {items: []});
    } catch (e) {
      throw e;
    }

    return regResult;
  }

  updateUserStatus(status : boolean) {
    localStorage.setItem("isLoggedIn", status.toString());
  }

}
