import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {TodolistComponent} from './todolist/todolist.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'todo', component: TodolistComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
