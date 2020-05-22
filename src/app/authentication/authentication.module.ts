import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {PublicLayoutModule} from '../public/public-layout/public-layout.module';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    // modules
    CommonModule,
    AuthenticationRoutingModule,
    PublicLayoutModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AuthenticationModule {}
