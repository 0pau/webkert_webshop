import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: "ratingPipe"
})
export class RatingPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return Intl.NumberFormat("hu-HU", {minimumFractionDigits: 1}).format(value);
  }
}
