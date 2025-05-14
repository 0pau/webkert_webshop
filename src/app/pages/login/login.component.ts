import {Component, inject} from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatError} from '@angular/material/input';
import {AuthService} from '../../services/auth.service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

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
    MatError,
    MatProgressSpinner
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  protected isWorking = false;
  private authService = inject(AuthService);

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

    this.isWorking = true;

    this.authService.signIn(this.email.value!.trim(), this.password.value!.trim()).then((credential)=>{
      this.authService.updateUserStatus(true);
      window.location.href="/";
    }).catch(error=>{
      switch (error.code) {
        case "auth/user-not-found":
          this.loginError = "A megadott email-címmel még nem regisztráltak."
          break;
        case "auth/invalid-credential":
          this.loginError = "Hibás felhasználónév vagy jelszó"
          break;
        default:
          this.loginError = "Ismeretlen hiba"
          break
      }
    }).finally(()=>{
      this.isWorking = false;
    });
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

    this.isWorking=true;

    this.authService.register(this.reg_email.value!.trim(), this.reg_password.value!.trim())
      .then(()=>{
        this.email.setValue(this.reg_email.value!);
        this.password.setValue(this.reg_password.value!);
        this.login();
      })
      .catch(error=>{
        switch (error.code) {
          case "auth/email-already-in-use":
            this.regError = "Ezzel az email-címmel már regisztráltak";
            break;
          default:
            this.regError = "Ismeretlen hiba"
        }
      })
      .finally(()=>{
        this.isWorking = false;
      })
  }

}
