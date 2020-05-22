import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutModule} from './admin-layout/admin-layout.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule, AdminLayoutModule],
})
export class AdminModule {}
