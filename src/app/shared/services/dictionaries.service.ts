import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DictionariesService {
  constructor() {}

  get assetValues(): string[] {
    return ['BTC', 'ETH'];
  }
}
