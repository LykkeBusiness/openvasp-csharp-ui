import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {PublicLayoutComponent} from './public-layout/public-layout.component';
import {PublicHeaderComponent} from './public-header/public-header.component';
import {PublicFooterComponent} from './public-footer/public-footer.component';
import {SharedModule} from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PublicLayoutComponent, PublicHeaderComponent, PublicFooterComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [PublicLayoutComponent],
})
export class PublicLayoutModule {}
