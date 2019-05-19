import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from './modules/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule],
  declarations: [],
  providers: [],
})
export class SharedModule {
}
