import {Component, OnInit, ViewChild, ElementRef, TemplateRef} from '@angular/core';
import {TranslateService} from 'src/app/shared/services/translate.service';
import {SettingsService} from 'src/app/core/settings/settings.service';

declare var KTApp: any;
declare var KTLayout: any;

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  user: any;
  userInitials: string;

  //#region global translates
  @ViewChild('closeSnackbarBtnTextElement', {static: true})
  closeSnackbarBtnTextElement: ElementRef;

  @ViewChild('errorMessageElement', {static: true})
  errorMessageElement: ElementRef;

  @ViewChild('errorImageUploadMessageElement', {static: true})
  errorImageUploadMessageElement: ElementRef;
  //#endregion

  //#region global templates
  @ViewChild('lengthError', {static: true})
  lengthError: TemplateRef<any>;
  @ViewChild('moneyFormatError', {static: true})
  moneyFormatError: TemplateRef<any>;
  @ViewChild('minNumberError', {static: true})
  minNumberError: TemplateRef<any>;
  @ViewChild('minMoreZeroNumberError', {static: true})
  minMoreZeroNumberError: TemplateRef<any>;
  @ViewChild('maxNumberError', {static: true})
  maxNumberError: TemplateRef<any>;
  @ViewChild('invalidAccuracyError', {static: true})
  invalidAccuracyError: TemplateRef<any>;
  @ViewChild('intRangeError', {static: true})
  intRangeError: TemplateRef<any>;
  //#endregion

  constructor(
    // services
    private settingsService: SettingsService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    if (this.user) {
      this.userInitials = (this.user.FirstName ? this.user.FirstName[0] : '') + (this.user.LastName ? this.user.LastName[0] : '');
    }

    const KTAppOptions = {
      colors: {
        state: {
          brand: '#4e3a96',
          metal: '#c4c5d6',
          light: '#ffffff',
          accent: '#00c5dc',
          primary: '#5867dd',
          success: '#1dc9b7',
          info: '#36a3f7',
          warning: '#ffb822',
          danger: '#fd3995',
          focus: '#9816f4',
        },
        base: {
          label: ['#c5cbe3', '#a1a8c3', '#3d4465', '#3e4466'],
          shape: ['#f0f3ff', '#d9dffa', '#afb4d4', '#646c9a'],
        },
      },
    };

    (KTLayout as any).init();
    (KTApp as any).init(KTAppOptions);

    //#region global translates
    const translates = this.translateService.translates;
    translates.CloseSnackbarBtnText = (this.closeSnackbarBtnTextElement.nativeElement as HTMLElement).innerText;
    translates.ErrorMessage = (this.errorMessageElement.nativeElement as HTMLElement).innerText;
    translates.ErrorImageUploadMessage = (this.errorImageUploadMessageElement.nativeElement as HTMLElement).innerText;
    //#endregion

    //#region global templates
    const templates = this.translateService.templates;
    templates.lengthError = this.lengthError;
    templates.intRangeError = this.intRangeError;
    templates.moneyFormatError = this.moneyFormatError;
    templates.minNumberError = this.minNumberError;
    templates.minMoreZeroNumberError = this.minMoreZeroNumberError;
    templates.maxNumberError = this.maxNumberError;
    templates.invalidAccuracyError = this.invalidAccuracyError;
    //#endregion
  }

  goToHelp() {
    window.open(this.settingsService.helpDocumentUrl, '_blank', 'noreferrer');
  }
}
