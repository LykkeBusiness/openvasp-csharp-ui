import {WhitelistingsListComponent} from './whitelistings-list/whitelistings-list.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {WhitelistingsRoutingModule} from './whitelistings-routing.module';

@NgModule({
  declarations: [
    // components
    WhitelistingsListComponent,
  ],
  imports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    WhitelistingsRoutingModule,
  ],
})
export class WhitelistingsModule {}
