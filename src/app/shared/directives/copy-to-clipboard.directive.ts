import {Directive, Input, HostListener} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Directive({
  selector: '[appCopyToClipboard]',
})
export class CopyToClipboardDirective {
  @Input('appCopyToClipboard')
  copyToClipboardText: string;

  constructor(private snackBar: MatSnackBar) {}

  @HostListener('click', ['$event.target'])
  public onClick() {
    this.copyText(this.copyToClipboardText);
    this.snackBar.open('Successfully copied to clipboard', null, {
      duration: 2500,
    });
  }

  private copyText(text: string) {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.left = '0';
    textarea.style.top = '0';
    textarea.style.opacity = '0';
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
