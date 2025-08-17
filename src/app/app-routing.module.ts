import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedUserGuard } from '../service/authentication/authenticated-user.guard';

import { LoginComponent } from 'src/app/login/components/login';
import { ChangePasswordComponent } from 'src/app/login/components/change-password';

const usersModule = () => import('src/app/users/users.module').then((x) => x.UsersModule);
const timeEntriesModule = () => import('src/app/time-entries/time-entries.module').then((x) => x.TimeEntriesModule);

const routes: Routes = [
  { path: 'user', loadChildren: usersModule, canActivate: [AuthenticatedUserGuard], },
  { path: 'time-entry', loadChildren: timeEntriesModule, canActivate: [AuthenticatedUserGuard], },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/changePassword', component: ChangePasswordComponent, canActivate: [AuthenticatedUserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
