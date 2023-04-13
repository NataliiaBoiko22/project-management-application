import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAssignedUser } from 'src/app/core/types/tasks.types';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss'],
})
export class TaskUpdateComponent {
  title!: string;

  description!: string;

  updateTaskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) { title, description }: IAssignedUser,
    private dialogRef: MatDialogRef<TaskUpdateComponent>
  ) {
    this.title = title;
    this.description = description;

    this.updateTaskForm = fb.group({
      title: [title, Validators.required],
      description: [description, Validators.required],
    });
  }

  onUpdateValue(): void {
    this.dialogRef.close(this.updateTaskForm.value);
  }
}
