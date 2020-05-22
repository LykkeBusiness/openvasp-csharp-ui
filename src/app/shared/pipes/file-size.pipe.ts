import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
  transform(valueInKB: number): string {
    if (valueInKB) {
      if (valueInKB % 1024 === 0) {
        return `${valueInKB / 1024} MB`;
      } else {
        return `${valueInKB} KB`;
      }
    }

    return '' + valueInKB;
  }
}
