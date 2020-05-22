import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'token',
})
export class TokenPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      value = numberWithCommas(value, ',', '.');
    }

    return value;
  }
}

function numberWithCommas(x: string, thousandsSeparator: string, fractionalSeparator: string): string {
  const parts = x.toString().split(fractionalSeparator);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  return parts.join(fractionalSeparator);
}
