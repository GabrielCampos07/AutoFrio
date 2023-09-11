import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documentFormat',
})
export class DocumentPipe implements PipeTransform {
  transform(value: string | number): string {
    let formatedValue = value + '';

    formatedValue = formatedValue
      .padStart(11, '0')
      .slice(0, 11)
      .replace(/[^0-9]/, '')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return formatedValue;
  }
}
