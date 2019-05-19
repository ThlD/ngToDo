import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Task} from '../shared/models/task.model';

@Component({
  selector: 'todo-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Task) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, [Validators.required]),
      description: new FormControl(this.data.description, []),
      priority: new FormControl(this.data.priority),
      tagColor: new FormControl(this.data.tagColor),
    });
  }

  add(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
