import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { AddNewPasswordComponent } from './add-new-password/add-new-password.component';
import { ViewPasswordsComponent } from './view-passwords/view-passwords.component';
/* import { componentFactoryName } from '@angular/compiler'; */

const routes: Routes = [
  {path:'',component:BaseComponent ,children:[
    {path:'',redirectTo:'viewAllPasswords'},
    {path:'viewAllPasswords',component:ViewPasswordsComponent},
    {path:'addNewPassword',component:AddNewPasswordComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
