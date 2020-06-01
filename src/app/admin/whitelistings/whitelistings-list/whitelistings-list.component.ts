import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {WhitelistingsService} from '../whitelistings.service';
import {TranslateService} from 'src/app/shared/services/translate.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HeaderMenuService} from 'src/app/shared/services/header-menu.service';
import {DATETIME_WITH_SECONDS_FORMAT} from 'src/app/core/constants/const';
import {WhitelistingDetailsModel} from '../models/whitelisting-details-model.interface';

@Component({
  selector: 'app-whitelistings-list',
  templateUrl: './whitelistings-list.component.html',
  styleUrls: ['./whitelistings-list.component.scss'],
})
export class WhitelistingsListComponent implements OnInit {
  @ViewChild('subHeaderTemplate', {static: true}) private subHeaderTemplate: TemplateRef<any>;
  isLoading = true;
  isSearching: boolean;
  whitelistings: WhitelistingDetailsModel[] = [];
  DATETIME_WITH_SECONDS_FORMAT = DATETIME_WITH_SECONDS_FORMAT;

  constructor(
    // services
    private snackBar: MatSnackBar,
    private whitelistingsService: WhitelistingsService,
    private translateService: TranslateService,
    private headerMenuService: HeaderMenuService
  ) {}

  ngOnInit() {
    this.headerMenuService.headerMenuContent = {
      title: 'Whitelistings',
      subHeaderContent: this.subHeaderTemplate,
    };

    this.getData();
  }

  private getData() {
    this.getWhitelistings();
  }

  getWhitelistings() {
    this.isLoading = true;

    this.whitelistingsService.getWhitelistings().subscribe(
      (whitelistings) => {
        this.whitelistings = whitelistings.map((o) => ({Name: o}));
      },
      (error) => {
        console.error(error);
        this.snackBar.open(this.translateService.translates.ErrorMessage, this.translateService.translates.CloseSnackbarBtnText);
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
