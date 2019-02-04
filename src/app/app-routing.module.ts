import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JokesComponent} from './pages/jokes/jokes.component';

const routes: Routes = [
  { path: '', redirectTo: '/jokes', pathMatch: 'full' },
  { path: 'jokes', component: JokesComponent },
  { path: 'search/:query', component: JokesComponent },
  { path: 'categories/:category', component: JokesComponent },
  { path: '**', redirectTo: '/jokes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
