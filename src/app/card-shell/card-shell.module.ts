import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardShellRoutingModule } from './card-shell-routing.module';
import { CardShellComponent } from './card-shell.component';
import { ShowCardModule } from '../show-card/show-card.module';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as ExperimentalScrollingModule } from "@angular/cdk-experimental/scrolling";
import { SideMenuModule } from '../side-menu/side-menu.module';
import { SideNavModule } from '../side-nav/side-nav.module';
import { GenreFilterModule } from '../genre-filter/genre-filter.module';
import { LayoutModule } from '@angular/cdk/layout';
@NgModule({
  declarations: [
    CardShellComponent
  ],
  imports: [
    CommonModule,
    CardShellRoutingModule,
    ShowCardModule,
    FormsModule,
    ScrollingModule,
    ExperimentalScrollingModule,
    SideMenuModule,
    SideNavModule,
    GenreFilterModule,
    LayoutModule
  ],
  exports: [
    ScrollingModule,
    ExperimentalScrollingModule
  ]
})
export class CardShellModule { }
