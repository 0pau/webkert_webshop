import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatError} from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    MatTabGroup,
    MatTab,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    ReactiveFormsModule,
    FormsModule,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  protected email = new FormControl("");
  protected password = new FormControl("");
  protected reg_email = new FormControl("");
  protected reg_password = new FormControl("");
  protected reg_password_verify = new FormControl("");

  protected loginError : string = "";
  protected regError : string = "";

  protected login() {

    this.loginError = "";

    if (this.email.value!.trim() == "" || this.password.value!.trim() == "") {
      this.loginError = "Töltsön ki minden mezőt!";
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", this.email.value!);
    localStorage.setItem("password", this.password.value!);

    window.location.href="/";

    //alert("Jelenleg csak tesztjelleggel működik a bejelentkezés!");
  }

  protected register() {

    this.regError = "";

    if (this.reg_email.value!.trim() == "" || this.reg_password.value!.trim() == "" || this.reg_password_verify.value!.trim() == "") {
      this.regError = "Töltsön ki minden mezőt!";
      return;
    }

    if (!this.reg_email.value!.match("^.+@.+\\..+$")) {
      this.regError = "Az email cím formátuma nem megfelelő";
      return;
    }

    if (this.reg_password.value! != this.reg_password_verify.value!) {
      this.regError = "A jelszavak nem egyeznek.";
      return;
    }

    this.email.setValue(this.reg_email.value!);
    this.password.setValue(this.reg_password.value!);
    this.login();
  }

}
