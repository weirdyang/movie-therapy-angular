import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardShellRoutingModule } from './card-shell-routing.module';
import { CardShellComponent } from './card-shell.component';
import { ShowCardModule } from '../show-card/show-card.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CardShellComponent
  ],
  imports: [
    CommonModule,
    CardShellRoutingModule,
    ShowCardModule,
    FormsModule
  ]
})
export class CardShellModule { }
