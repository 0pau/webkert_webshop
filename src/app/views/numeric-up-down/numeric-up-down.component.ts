import {Component, EventEmitter, Input, Output} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-numeric-up-down',
  imports: [
    MatIcon,
    MatButton,
    MatIconButton
  ],
  templateUrl: './numeric-up-down.component.html',
  styleUrl: './numeric-up-down.component.scss'
})
export class NumericUpDownComponent {

  @Input() initialValue : number = 1;
  protected value : number = 1;
  @Input() min : number = 1;
  @Input() max : number = 999;
  @Output() onError : EventEmitter<string> = new EventEmitter();
  @Output() onValueChange : EventEmitter<number> = new EventEmitter();

  constructor() {
    this.value = this.initialValue;
  }

  add() {
    if (this.value + 1 <= this.max) {
      this.value++;
    } else {
      this.onError.emit("Ennél több termék nincs raktáron.");
    }
    this.emit();
  }

  private emit() {
    this.onValueChange.emit(this.value);
  }

  substract() {
    if (this.value - 1 >= this.min) {
      this.value--;
    } else {
      this.onError.emit("Elérte a minimumot")
    }
    this.emit();
  }

}
