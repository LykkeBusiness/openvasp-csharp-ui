import {Component, Input, Optional, TemplateRef} from '@angular/core';
import {AbstractControl, ControlContainer, FormGroupDirective, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input()
  key: string;

  @Input()
  message: string;

  @Input() template: TemplateRef<any>;
  @Input() templateContext: any;

  @Input() showByDefault = false;

  @Input()
  controlName: string;

  constructor(
    // injected props
    @Optional() private controlContainer: ControlContainer,
    @Optional() private formGroupDirective: FormGroupDirective
  ) {}

  get formControl(): AbstractControl {
    return (
      this.controlName &&
      this.controlContainer &&
      this.controlContainer.control &&
      (this.controlContainer.control as FormGroup).controls[this.controlName]
    );
  }

  error: string;

  get showError(): boolean {
    if (this.formControl && this.formControl.invalid && this.formControl.errors && Object.keys(this.formControl.errors).length) {
      if (this.formControl.touched || this.formControl.dirty || (this.formGroupDirective && this.formGroupDirective['submitted'])) {
        this.error = Object.keys(this.formControl.errors)[0];
        // log(this.controlName, this.key, Object.keys(this.formControl.errors));
        return !this.key || this.error === this.key;
      }
    }
    return false;
  }
}
