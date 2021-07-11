import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCardComponent } from './show-card.component';
import { RatingPipeModule } from '../rating-pipe/rating-pipe.module';



@NgModule({
  declarations: [
    ShowCardComponent
  ],
  imports: [
    CommonModule,
    RatingPipeModule
  ],
  exports: [
    ShowCardComponent
  ]
})
export class ShowCardModule { }
