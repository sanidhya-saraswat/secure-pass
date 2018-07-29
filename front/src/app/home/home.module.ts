import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { BodyComponent } from './body/body.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../common/shared.module';

@NgModule({
  imports: [
    CommonModule,HomeRoutingModule,SharedModule
  ],
  declarations: [BaseComponent, BodyComponent, NavbarComponent]
})
export class HomeModule { }
