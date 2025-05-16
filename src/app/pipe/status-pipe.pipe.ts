import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe'
})
export class StatusPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    switch (value) {
      case 0:
        return "Beérkezett"
      case 1:
        return "Feldolgozva"
      case 2:
        return "Szállítás alatt"
      case 3:
        return "Teljesítve"
    }
    return "Ismeretlen"
  }

}
