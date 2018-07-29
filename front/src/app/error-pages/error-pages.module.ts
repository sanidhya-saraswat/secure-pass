import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { E404Component } from './e404/e404.component';
import { Routes, RouterModule } from '@angular/router';
import { E500Component } from './e500/e500.component';
import { E401Component } from './e401/e401.component';
import { SharedModule } from '../common/shared.module';
const routes: Routes = [
  { path: '404', component: E404Component },
  { path: '500', component: E500Component },
  { path: '401', component: E401Component },
  {path:'**',redirectTo:'/error/404'}
];
@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [E404Component, E500Component, E401Component]
})
export class ErrorPagesModule { }
