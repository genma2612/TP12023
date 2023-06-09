import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cortarUsuario'
})
export class CortarUsuarioPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.split("@")[0];
  }

}
