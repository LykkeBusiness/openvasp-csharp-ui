import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WhitelistingsListComponent} from './whitelistings-list/whitelistings-list.component';

const routes: Routes = [
  {
    path: '',
    component: WhitelistingsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhitelistingsRoutingModule {}
