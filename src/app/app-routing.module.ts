import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchesComponent } from './matches/matches.component';

const routes: Routes = [
  { path: '', redirectTo: 'matches', pathMatch: 'full'},
  { path: 'matches', component: MatchesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
