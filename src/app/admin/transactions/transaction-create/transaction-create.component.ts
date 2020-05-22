import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {HeaderMenuService} from 'src/app/shared/services/header-menu.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TransactionsService} from '../transactions.service';
import {TranslateService} from 'src/app/shared/services/translate.service';
import {CreateOutgoingTransactionRequest} from '../models/OpenVASP.Host.Models/create-outgoing-transaction-request.interface';
import {ROUTE_ADMIN_ROOT, ROUTE_TRANSACTIONS} from 'src/app/core/constants/routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss'],
})
export class TransactionCreateComponent implements OnInit {
  @ViewChild('subHeaderTemplate', {static: true})
  private subHeaderTemplate: TemplateRef<any>;
  isLoading: boolean;
  errors: string[] = [];

  constructor(
    // services
    private headerMenuService: HeaderMenuService,
    private router: Router,
    private snackBar: MatSnackBar,
    private transactionsService: TransactionsService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.headerMenuService.headerMenuContent = {
      title: 'Create Transaction',
      subHeaderContent: this.subHeaderTemplate,
    };
  }

  onFormSubmit(formData: CreateOutgoingTransactionRequest) {
    this.isLoading = true;

    this.transactionsService.create(formData).subscribe(
      () => {
        this.handleSuccess();
        this.isLoading = false;
      },
      (error) => {
        this.snackBar.open(this.translateService.translates.ErrorMessage, this.translateService.translates.CloseSnackbarBtnText, {
          duration: 5000,
        });

        console.error(error);

        if (error.errors) {
          this.errors = error.errors;
        }

        this.isLoading = false;
      }
    );
  }

  private handleSuccess() {
    this.snackBar.open('You have created transaction successfully.', this.translateService.translates.CloseSnackbarBtnText, {
      duration: 5000,
    });

    this.router.navigate([`${ROUTE_ADMIN_ROOT}/${ROUTE_TRANSACTIONS}`]);
  }
}
