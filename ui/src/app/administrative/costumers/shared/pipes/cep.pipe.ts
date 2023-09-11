import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cepFormat',
})
export class CepPipe implements PipeTransform {
  transform(value: string): string {
    value = value.toString();

    if (value && value.length === 8) {
      return `${value.substring(0, 5)}-${value.substring(5)}`;
    } else {
      return value;
    }
  }
}
