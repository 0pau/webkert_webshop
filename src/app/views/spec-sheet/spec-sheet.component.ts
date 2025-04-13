import {Component, Input} from '@angular/core';
import {SpecProperty} from '../../model/SpecProperty';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-spec-sheet',
  imports: [
    NgForOf
  ],
  templateUrl: './spec-sheet.component.html',
  styleUrl: './spec-sheet.component.scss'
})
export class SpecSheetComponent {
  @Input() specs: Map<string, SpecProperty>|undefined = undefined;
  private entries: SpecProperty[] = [];

  getSpecEntries() {
    return this.entries;
  }

  ngOnInit() {
    for (let k of this.specs!) {
      this.entries.push(k[1]);
    }
  }
}
