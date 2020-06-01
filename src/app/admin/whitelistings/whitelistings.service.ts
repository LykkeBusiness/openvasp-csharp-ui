import {Injectable} from '@angular/core';
import {ApiHttpService} from 'ngx-api-utils';

@Injectable({
  providedIn: 'root',
})
export class WhitelistingsService {
  constructor(private apiHttp: ApiHttpService) {}

  getWhitelistings() {
    return this.apiHttp.get<string[]>('/api/vaspCodes', {
      headers: this.apiHttp.headersWithNoAuthorization(),
    });
  }
}
