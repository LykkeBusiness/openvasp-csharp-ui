import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TransactionsService} from '../transactions.service';
import {TranslateService} from 'src/app/shared/services/translate.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HeaderMenuService} from 'src/app/shared/services/header-menu.service';
import {TransactionDetailsModel} from '../models/OpenVASP.Host.Models.Response/transaction-details-model.interface';
import {TransactionType} from '../models/OpenVASP.Host.Core.Models/transaction-type.enum';
import {TransactionStatus} from '../models/OpenVASP.Host.Core.Models/transaction-status.enum';
import {DATETIME_WITH_SECONDS_FORMAT} from 'src/app/core/constants/const';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit {
  @ViewChild('subHeaderTemplate', {static: true}) private subHeaderTemplate: TemplateRef<any>;
  isLoadingOutgoing = true;
  isSearchingOutgoing: boolean;

  isLoadingIncoming = true;
  isSearchingIncoming: boolean;
  outgoingTransactions: TransactionDetailsModel[] = [];
  incomingTransactions: TransactionDetailsModel[] = [];
  TransactionType = TransactionType;
  TransactionStatus = TransactionStatus;
  DATETIME_WITH_SECONDS_FORMAT = DATETIME_WITH_SECONDS_FORMAT;

  constructor(
    // services
    private snackBar: MatSnackBar,
    private transactionsService: TransactionsService,
    private translateService: TranslateService,
    private headerMenuService: HeaderMenuService
  ) {}

  ngOnInit() {
    this.headerMenuService.headerMenuContent = {
      title: 'Transactions',
      subHeaderContent: this.subHeaderTemplate,
    };

    this.getData();
  }

  private getData() {
    this.getOutgoing();
    this.getIncoming();
  }

  getOutgoing() {
    this.isLoadingOutgoing = true;

    this.transactionsService.getOutgoingTransactions().subscribe(
      (transactions) => {
        this.outgoingTransactions = transactions;
      },
      (error) => {
        console.error(error);
        this.snackBar.open(this.translateService.translates.ErrorMessage, this.translateService.translates.CloseSnackbarBtnText);
      },
      () => {
        this.isLoadingOutgoing = false;
      }
    );
  }

  getIncoming() {
    this.isLoadingIncoming = true;

    this.transactionsService.getIncomingTransactions().subscribe(
      (transactions) => {
        this.incomingTransactions = transactions;
      },
      (error) => {
        console.error(error);
        this.snackBar.open(this.translateService.translates.ErrorMessage, this.translateService.translates.CloseSnackbarBtnText);
      },
      () => {
        this.isLoadingIncoming = false;
      }
    );
  }
}
