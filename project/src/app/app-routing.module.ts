import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRationCardsComponent } from './list-ration-cards/list-ration-cards.component';
import { AddRationCardComponent } from './add-ration-card/add-ration-card.component';
import { EditRationCardComponent } from './edit-ration-card/edit-ration-card.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListRationCardsComponent },
  { path: 'add', component: AddRationCardComponent },
  { path: 'edit/:id', component: EditRationCardComponent },
  { path: '**', redirectTo: '/list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
