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
  @Input() specs: Object|undefined = undefined;
  private entries: SpecProperty[] = [];

  getSpecEntries() {
    return this.entries;
  }

  ngOnInit() {
    Object.values(this.specs!).forEach((v) =>{
      this.entries.push({...v} as SpecProperty)
    })
  }
}
