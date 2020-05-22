import {Component, HostListener, OnInit, HostBinding, Inject, LOCALE_ID} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostBinding('attr.dir') dir = 'ltr';

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander() {}

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  ngOnInit(): void {
    console.log(this.locale);
  }
}
