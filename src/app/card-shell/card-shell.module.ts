import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardShellRoutingModule } from './card-shell-routing.module';
import { CardShellComponent } from './card-shell.component';
import { ShowCardModule } from '../show-card/show-card.module';


@NgModule({
  declarations: [
    CardShellComponent
  ],
  imports: [
    CommonModule,
    CardShellRoutingModule,
    ShowCardModule
  ]
})
export class CardShellModule { }
