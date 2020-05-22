import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {TransactionsRoutingModule} from './transactions-routing.module';
import {TransactionCreateComponent} from './transaction-create/transaction-create.component';
import {TransactionFormComponent} from './transaction-form/transaction-form.component';

@NgModule({
  declarations: [
    // components
    TransactionsListComponent,
    TransactionCreateComponent,
    TransactionFormComponent,
  ],
  imports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TransactionsRoutingModule,
  ],
})
export class TransactionsModule {}
