import {Pipe, PipeTransform} from '@angular/core';
import {Country} from '../models/country.interface';

@Pipe({
  name: 'searchCountry',
})
export class SearchCountryPipe implements PipeTransform {
  transform(value: Country[], searchText: string): Country[] {
    if (value && value.length) {
      value.forEach((x) => {
        if (!searchText || (searchText && x.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)) {
          x.isHidden = false;
        } else {
          x.isHidden = true;
        }
      });
    }

    return value;
  }
}
