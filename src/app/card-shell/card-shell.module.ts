import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardShellRoutingModule } from './card-shell-routing.module';
import { CardShellComponent } from './card-shell.component';
import { ShowCardModule } from '../show-card/show-card.module';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    CardShellComponent
  ],
  imports: [
    CommonModule,
    CardShellRoutingModule,
    ShowCardModule,
    FormsModule,
    ScrollingModule
  ],
  exports: [
    ScrollingModule
  ]
})
export class CardShellModule { }
