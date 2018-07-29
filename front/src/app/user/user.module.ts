import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { BaseComponent } from './base/base.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../common/shared.module';
import { InfoComponent } from './info/info.component';
import { AddNewPasswordComponent } from './add-new-password/add-new-password.component';
import { ViewPasswordsComponent } from './view-passwords/view-passwords.component';
import { SearchPipe } from './add-new-password/search.pipe';
import { HighlightPipe } from './add-new-password/highlight.pipe';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FilterPipe } from './view-passwords/filter.pipe';
import { Filter2Pipe } from './view-passwords/filter2.pipe.';
import { FormatDatePipe } from './view-passwords/formatDate.pipe';
import { SortByPipe } from './view-passwords/sortBy.pipe';
import { BottomsheetComponent } from './bottomsheet/bottomsheet.component';
import { HideExtraPipe } from './view-passwords/hideExtra.pipe';
import 'hammerjs';
import 'hammer-timejs';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    FilterPipe,
    Filter2Pipe,
    SortByPipe,
    SearchPipe,
    FormatDatePipe,
    HighlightPipe,
    HideExtraPipe,
    BaseComponent,
    NavbarComponent,
    InfoComponent,
    AddNewPasswordComponent,
    ViewPasswordsComponent,
    DeleteDialogComponent,
    BottomsheetComponent
  ],
  entryComponents:[DeleteDialogComponent,BottomsheetComponent]
})
export class UserModule { }
