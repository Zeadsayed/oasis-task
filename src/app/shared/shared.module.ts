import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './models/FilterPipe';


@NgModule({
  declarations: [
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
