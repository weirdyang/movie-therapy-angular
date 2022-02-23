import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreFilterComponent } from './genre-filter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    GenreFilterComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    GenreFilterComponent,
    FontAwesomeModule
  ]
})
export class GenreFilterModule { }
