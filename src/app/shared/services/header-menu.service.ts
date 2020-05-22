import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderMenuService {
  private changeHeaderMenuContent = new Subject();
  private _headerMenuContent = {title: '', subHeaderContent: ''};
  get headerMenuContent() {
    return this._headerMenuContent;
  }
  set headerMenuContent(value: any) {
    this._headerMenuContent = value;
    this.changeHeaderMenuContent.next(value);
  }
  constructor() {}

  listenForHeaderMenuContentChange() {
    return this.changeHeaderMenuContent.asObservable();
  }
}
