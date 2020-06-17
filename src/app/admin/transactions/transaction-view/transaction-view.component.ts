import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {Country} from 'src/app/shared/models/country.interface';
import {CountriesService} from 'src/app/shared/services/countries.service';
import {HeaderMenuService} from 'src/app/shared/services/header-menu.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from 'src/app/shared/services/translate.service';
import {ROUTE_ADMIN_ROOT, ROUTE_TRANSACTIONS} from 'src/app/core/constants/routes';
import {TransactionsService} from '../transactions.service';
import {SessionReplyMessageCode} from '../models/OpenVASP.Messaging.Messages/session-reply-message-code.enum';
import {TransactionDetailsModel} from '../models/OpenVASP.Host.Models.Response/transaction-details-model.interface';
import {TransactionType} from '../models/OpenVASP.Host.Core.Models/transaction-type.enum';
import {TransactionStatus} from '../models/OpenVASP.Host.Core.Models/transaction-status.enum';
import {DictionariesService} from 'src/app/shared/services/dictionaries.service';
import {DATETIME_WITH_SECONDS_FORMAT, DATEONLY_FORMAT} from 'src/app/core/constants/const';
import {TransferReplyMessageCode} from '../models/OpenVASP.Messaging.Messages/transfer-reply-message-code.enum';
import * as moment from 'moment';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss'],
})
export class TransactionViewComponent implements OnInit {
  @ViewChild('subHeaderTemplate', {static: true})
  private subHeaderTemplate: TemplateRef<any>;
  id: string;
  transaction: TransactionDetailsModel;
  isLoading = true;
  isSaving = false;
  errors: string[] = [];
  navigateToListUrl = `${ROUTE_ADMIN_ROOT}/${ROUTE_TRANSACTIONS}`;
  assetValues: string[] = [];
  countries: Country[] = [];
  TransactionType = TransactionType;
  TransactionStatus = TransactionStatus;
  sessionReplyModel = {
    Code: null as SessionReplyMessageCode,
  };
  sessionReplyMessageCodeValues: Array<{Value: SessionReplyMessageCode; DisplayName: string}> = [
    {Value: SessionReplyMessageCode.SessionAccepted, DisplayName: SessionReplyMessageCode.SessionAccepted},
    {Value: SessionReplyMessageCode.SessionDeclinedRequestNotValid, DisplayName: SessionReplyMessageCode.SessionDeclinedRequestNotValid},
    {
      Value: SessionReplyMessageCode.SessionDeclinedOriginatorVaspCouldNotBeAuthenticated,
      DisplayName: SessionReplyMessageCode.SessionDeclinedOriginatorVaspCouldNotBeAuthenticated,
    },
    {
      Value: SessionReplyMessageCode.SessionDeclinedOriginatorVaspDeclined,
      DisplayName: SessionReplyMessageCode.SessionDeclinedOriginatorVaspDeclined,
    },
    {
      Value: SessionReplyMessageCode.SessionDeclinedTemporaryDisruptionOfService,
      DisplayName: SessionReplyMessageCode.SessionDeclinedTemporaryDisruptionOfService,
    },
  ];
  transferReplyModel = {
    Code: null as TransferReplyMessageCode,
    DestinationAddress: '',
  };
  transferReplyMessageCodeValues: Array<{Value: TransferReplyMessageCode; DisplayName: string}> = [
    {Value: TransferReplyMessageCode.TransferAccepted, DisplayName: TransferReplyMessageCode.TransferAccepted},
    {
      Value: TransferReplyMessageCode.TransferDeclinedRequestNotValid,
      DisplayName: TransferReplyMessageCode.TransferDeclinedRequestNotValid,
    },
    {
      Value: TransferReplyMessageCode.TransferDeclinedNoSuchBeneficiary,
      DisplayName: TransferReplyMessageCode.TransferDeclinedNoSuchBeneficiary,
    },
    {
      Value: TransferReplyMessageCode.TransferDeclinedVirtualAssetNotSupported,
      DisplayName: TransferReplyMessageCode.TransferDeclinedVirtualAssetNotSupported,
    },
    {
      Value: TransferReplyMessageCode.TransferDeclinedTransferNotAuthorized,
      DisplayName: TransferReplyMessageCode.TransferDeclinedTransferNotAuthorized,
    },
    {
      Value: TransferReplyMessageCode.TransferDeclinedTemporaryDisruptionOfService,
      DisplayName: TransferReplyMessageCode.TransferDeclinedTemporaryDisruptionOfService,
    },
  ];
  get isValidTransferReply(): boolean {
    return (
      (this.transferReplyModel.Code && !!this.transferReplyModel.DestinationAddress) ||
      (this.transferReplyModel.Code && this.transferReplyModel.Code !== TransferReplyMessageCode.TransferAccepted)
    );
  }

  today = moment.utc().hour(0).minute(0).second(0).millisecond(0);
  transferDispatchModel = {
    SendingAddress: '',
    TransactionHash: '',
    TransactionDateTime: this.today,
  };
  DATETIME_WITH_SECONDS_FORMAT = DATETIME_WITH_SECONDS_FORMAT;
  DATEONLY_FORMAT = DATEONLY_FORMAT;

  constructor(
    // services
    private countriesService: CountriesService,
    private dictionariesService: DictionariesService,
    private headerMenuService: HeaderMenuService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private transactionsService: TransactionsService,
    private translateService: TranslateService
  ) {
    this.assetValues = this.dictionariesService.assetValues;
    this.countries = this.countriesService.countries;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.route.queryParams.subscribe((params) => {
      const type = params['type'] as TransactionType;

      if (type === TransactionType.Incoming) {
        this.transactionsService.getIncomingTransaction(this.id).subscribe(
          (res) => {
            this.handleResponse(res);
            this.transaction = res;
            this.isLoading = false;
          },
          () => {
            this.navigateToList();

            this.snackBar.open(this.translateService.translates.ErrorMessage, this.translateService.translates.CloseSnackbarBtnText, {
              duration: 5000,
            });

            this.isLoading = false;
          }
        );
      } else {
        this.transactionsService.getOutgoingTransaction(this.id).subscribe(
          (res) => {
            this.handleResponse(res);
            this.transaction = res;
            this.isLoading = false;
          },
          () => {
            this.navigateToList();

            this.snackBar.open(this.translateService.translates.ErrorMessage, this.translateService.translates.CloseSnackbarBtnText, {
              duration: 5000,
            });

            this.isLoading = false;
          }
        );
      }
    });

    this.headerMenuService.headerMenuContent = {
      title: 'View Transaction',
      subHeaderContent: this.subHeaderTemplate,
    };
  }

  private handleResponse(res: TransactionDetailsModel) {
    if (
      res.TransactionDateTime &&
      (res.TransactionDateTime.toString().startsWith('01/01/0001') || res.TransactionDateTime.toString().startsWith('0001-01-01'))
    ) {
      res.TransactionDateTime = null;
    }
  }

  getCountryNameByIso2Code(iso2Code: string): string {
    return this.countriesService.getCountryNameByIso2Code(iso2Code);
  }

  sessionReply() {
    this.isSaving = true;

    this.transactionsService.sessionReply(this.id, this.sessionReplyModel).subscribe(
      () => {
        this.handleSuccess();
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  transferReply() {
    this.isSaving = true;

    this.transactionsService.transferReply(this.id, this.transferReplyModel).subscribe(
      () => {
        this.handleSuccess();
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  transferDispatch() {
    // log(JSON.stringify(this.transferDispatchModel, null, 2));
    this.isSaving = true;

    this.transactionsService.transferDispatch(this.id, this.transferDispatchModel).subscribe(
      () => {
        this.handleSuccess();
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  transferConfirm() {
    this.isSaving = true;

    this.transactionsService.transferConfirm(this.id).subscribe(
      () => {
        this.handleSuccess();
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  private handleSuccess() {
    this.snackBar.open('Information sent.', this.translateService.translates.CloseSnackbarBtnText, {
      duration: 5000,
    });

    this.navigateToList();
  }

  private navigateToList() {
    this.router.navigate([this.navigateToListUrl]);
  }

  private handleError(error: any) {
    this.snackBar.open(this.translateService.translates.ErrorMessage, this.translateService.translates.CloseSnackbarBtnText, {
      duration: 5000,
    });
    console.error(error);
    if (error.errors) {
      this.errors = error.errors;
    }
    this.isSaving = false;
  }
}
