import {Component, inject} from '@angular/core';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-billing-address-editor',
  imports: [
    MatFormField,
    MatInput,
    MatCheckbox,
    MatDialogActions,
    MatButton,
    FormsModule
  ],
  templateUrl: './billing-address-editor.component.html',
  styleUrl: './billing-address-editor.component.scss'
})
export class BillingAddressEditorComponent {
  dialogRef = inject(MatDialogRef);
  private snackbar = inject(MatSnackBar);
  data = inject(MAT_DIALOG_DATA);
  oldData:any;

  ngOnInit() {
    this.oldData = {...this.data};
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {

    for (let key in this.oldData) {
      let a:string = this.oldData[key].toString().trim();
      if (a === "") {
        this.snackbar.open("Töltse ki az összes mezőt","", {
          duration: 2000
        })
        return;
      }
    }

    this.snackbar.open("Sikeres mentés!","", {
      duration: 2000
    })

    this.dialogRef.close(this.oldData);
  }
}
