import {NgModule} from '@angular/core';

import {TodolistComponent} from './todolist.component';
import {SharedModule} from '../shared/shared.module';
import {CreateTaskComponent} from './create-task/create-task.component';
import {IsDonePipe} from './shared/pipes/is-done.pipe';
import {MomentPipe} from './shared/pipes/moment.pipe';
import {EditTaskComponent} from './edit-task/edit-task.component';
import {SortByDatePipe} from './shared/pipes/sort-by-date.pipe';
import {FilterByPrioPipe} from './shared/pipes/filter-by-prio.pipe';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [TodolistComponent, CreateTaskComponent, EditTaskComponent, IsDonePipe, MomentPipe, SortByDatePipe, FilterByPrioPipe],
  providers: [],
  entryComponents: [CreateTaskComponent, EditTaskComponent]
})
export class TodolistModule {
}
