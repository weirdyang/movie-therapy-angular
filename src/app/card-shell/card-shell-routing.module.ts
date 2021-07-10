import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardShellComponent } from './card-shell.component';

const routes: Routes = [{ path: '', component: CardShellComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardShellRoutingModule { }
