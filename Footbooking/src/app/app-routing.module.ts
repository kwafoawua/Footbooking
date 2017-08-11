import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{ LoginComponent } from './login/login.component';
import{ RegisterClubComponent } from './register-club/register-club.component';

const appRoutes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'register-club', 
    component: RegisterClubComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}