import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

import {Task} from '../models/task.model';
import {UiService} from '../../../shared/services/ui.service';

@Injectable()
export class TaskService {
  taskListChanged = new Subject<Task[]>();

  constructor(private db: AngularFirestore,
              private uiService: UiService) {
  }

  addTask(task: Task) {
    this.addTaskToDatabase(task);
  }

  editTask(task: Task) {
    this.updateTaskInDatabase(task);
  }

  changeTaskState(id: string, state: boolean) {
    this.updateIsDoneState(id, state);
  }

  deleteTask(id: string) {
    this.deleteTaskfromDatabase(id);
  }

  fetchTasks() {
    this.uiService.isLoadingChange.next(true);
    return this.db
      .collection('tasks')
      .snapshotChanges()
      .pipe(
        map(todoListData => {
          return todoListData.map(data => {
            return {
              id: data.payload.doc.id,
              ...data.payload.doc.data()
            } as Task;
          });
        })
      )
      .subscribe((todoList: Task[]) => {
        this.uiService.isLoadingChange.next(false);
        this.taskListChanged.next([...todoList]);
      }, error => {
        this.uiService.showSnackbar(error.message, null, 4000);
      });
  }

  private addTaskToDatabase(task: Task) {
    this.db.collection('tasks').add(task)
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 4000);
      });
  }

  private updateIsDoneState(taskID: string, state: boolean) {
    this.db
      .collection('tasks')
      .doc(taskID)
      .update({isDone: state})
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 4000);
      });
  }

  private updateTaskInDatabase(task: Task) {
    this.db
      .collection('tasks')
      .doc(task.id)
      .update({
        name: task.name,
        description: task.description,
        priority: task.priority,
        tagColor: task.tagColor,
        ownerLetter: task.ownerLetter
      })
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 4000);
      });
  }

  private deleteTaskfromDatabase(taskID: string) {
    this.db
      .collection('tasks')
      .doc(taskID)
      .delete()
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 4000);
      });
  }
}
