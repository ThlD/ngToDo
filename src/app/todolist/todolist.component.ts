import {Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';

import {TaskService} from './shared/services/task.service';
import {Task} from './shared/models/task.model';
import {EditTaskComponent} from './edit-task/edit-task.component';
import {AuthService} from '../auth/auth.service';
import {UiService} from '../shared/services/ui.service';

@Component({
  selector: 'todo-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit, OnDestroy {
  todoList: Task[] = [];
  doneList: Task[] = [];
  sortField = 'date';
  filterValue: string | null = null;
  isNewTasksFirst = true;
  taskListSub: Subscription;
  isAuth = false;
  isLoading = false;
  loadingSub: Subscription;
  userName: string;

  constructor(private taskService: TaskService,
              private db: AngularFirestore,
              private dialog: MatDialog,
              private authService: AuthService,
              private uiService: UiService) {
  }

  ngOnInit() {
    this.loadingSub = this.uiService.isLoadingChange.subscribe(isLoading => {
      this.isAuth = this.authService.isAuth();
      this.isLoading = isLoading;
      this.userName = this.authService.getUserName();
    });
    this.taskService.fetchTasks();
    this.taskListSub = this.taskService.taskListChanged.subscribe(taskList => {
      this.todoList = taskList.filter(i => i.isDone === false);
      this.doneList = taskList.filter(i => i.isDone === true);
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (this.isAuth) {
        const currentTaskID: string = event.item.element.nativeElement.id;
        const currentTask: Task = event.previousContainer.data.find(t => t.id === currentTaskID);
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        if (currentTask.isDone === false) {
          this.taskService.changeTaskState(currentTaskID, true);
        } else {
          this.taskService.changeTaskState(currentTaskID, false);
        }
      } else {
        this.uiService.showSnackbar('В гостевом режиме доступен только просмотр', null, 4000);
      }
    }
  }

  onDone(id: string) {
    this.taskService.changeTaskState(id, true);
  }

  onTodo(id: string) {
    this.taskService.changeTaskState(id, false);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  openDialog(taskItemData): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: taskItemData,
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editedTask: Task = {
          name: result.name,
          description: result.description,
          priority: result.priority,
          id: taskItemData.id,
          tagColor: result.tagColor,
          ownerLetter: this.userName.substr(0, 1)
        };
        this.taskService.editTask(editedTask);
      }
    });
  }

  sortTaskByDate(isNewTasksFirst: boolean) {
    this.isNewTasksFirst = isNewTasksFirst;
  }

  filterTaskByPrio(value: string | null) {
    this.filterValue = value;
  }

  ngOnDestroy() {
    if (this.taskListSub) {
      this.taskListSub.unsubscribe();
    }
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }
}
