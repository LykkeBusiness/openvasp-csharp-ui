import {Injectable} from '@angular/core';
import {GlobalTranslate} from '../models/global-translate.interface';
import {GlobalTemplates} from '../models/global-templates.interface';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  globalTranslates: GlobalTranslate;
  globalTemplates: GlobalTemplates;

  get translates() {
    return this.globalTranslates;
  }

  get templates() {
    return this.globalTemplates;
  }

  constructor() {
    this.globalTranslates = new GlobalTranslate();
    this.globalTemplates = new GlobalTemplates();
  }
}
