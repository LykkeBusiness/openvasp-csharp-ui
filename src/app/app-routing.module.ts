import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApiAuthGuardService} from 'ngx-api-utils';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    // canActivate: [ApiAuthGuardService],
    // canActivateChild: [ApiAuthGuardService],
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
    canActivate: [ApiAuthGuardService],
    canActivateChild: [ApiAuthGuardService],
  },
  {
    path: '',
    loadChildren: () => import('./public/public.module').then((m) => m.PublicModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
