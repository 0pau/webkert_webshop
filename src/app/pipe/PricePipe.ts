import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: "pricePipe"
})
export class PricePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return Intl.NumberFormat("hu-HU").format(parseInt(value)) + " Ft";
  }
}
