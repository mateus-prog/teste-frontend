import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedUserGuard } from '../service/authentication/authenticated-user.guard';

import { LoginComponent } from 'src/app/login/components/login';
import { ChangePasswordComponent } from 'src/app/login/components/change-password';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/changePassword', component: ChangePasswordComponent, canActivate: [AuthenticatedUserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
