import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app.material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MaterialModule,
    FlexLayoutModule, FormsModule,
    ReactiveFormsModule
  ],
  declarations: [],
  providers:[{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000,panelClass:"mySnackbar"}}]
})
export class SharedModule { }
