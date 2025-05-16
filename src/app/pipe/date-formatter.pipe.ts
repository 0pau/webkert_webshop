import { Pipe, PipeTransform } from '@angular/core';
import {formatDate} from '@angular/common';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    // @ts-ignore
    let d = new Date(value["seconds"]*1000);
    return formatDate(d, "yyyy. MM. dd. HH:mm", "en-Us");
  }

}
