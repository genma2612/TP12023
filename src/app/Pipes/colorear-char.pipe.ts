import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CambiarPorSigno'
})
export class CambiarPorSignoCharPipe implements PipeTransform {

  constructor() { }

  transform(value: number, ...args: unknown[]): unknown {
    switch (value) {
      case 11:
        return 'J'
      case 12:
        return 'Q'
      case 13:
        return 'K'
      default:
        return value;
    }
  }

}
