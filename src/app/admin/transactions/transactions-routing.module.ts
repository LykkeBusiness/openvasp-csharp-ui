import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {TransactionCreateComponent} from './transaction-create/transaction-create.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsListComponent,
  },
  {
    path: 'create',
    component: TransactionCreateComponent,
  },
  // {
  //   path: `view/:id`,
  //   component: TransactionViewComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
