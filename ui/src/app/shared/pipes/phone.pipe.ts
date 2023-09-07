import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    if (value && value.length === 11) {
      // Formato: (00) 00000-0000
      return `(${value.substring(0, 2)}) ${value.substring(
        2,
        7
      )}-${value.substring(7)}`;
    }

    if (value && value.length === 10) {
      // Formato: (00) 0000-0000
      return `(${value.substring(0, 2)}) ${value.substring(
        2,
        6
      )}-${value.substring(6)}`;
    }

    return value;
  }
}
