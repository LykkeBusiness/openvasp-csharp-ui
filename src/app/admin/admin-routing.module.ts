import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './admin-layout/admin-layout/admin-layout.component';
import {AdminLayoutModule} from './admin-layout/admin-layout.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'platform/transactions',
  },
  {
    path: 'platform',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then((m) => m.TransactionsModule),
      },
    ],
  },
];

@NgModule({
  imports: [AdminLayoutModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
