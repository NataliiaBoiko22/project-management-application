import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Task } from 'src/app/core/types/tasks.types';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http.service';
import { BoardService } from '../../services/board.service';
import { TaskUpdateComponent } from '../task-update/task-update.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { _DisposeViewRepeaterStrategy } from '@angular/cdk/collections';
import { MatDialogComponent } from 'src/app/core/components/mat-dialog/mat-dialog.component';
import { ColumnComponent } from '../column/column.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DescrDialogComponent } from 'src/app/core/components/descr-dialog/descr-dialog.component';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() taskData!: Task;

  @Input() columnsIds!: string[];

  @Input() boardId!: string;

  @Input() columnId!: string;

  @Output() update = new EventEmitter<string>();
  constructor(
    private httpService: HttpService,
    private boardService: BoardService,
    public dialog: MatDialog,
    public columnComponent: ColumnComponent,
    private _snackBar: MatSnackBar,
  ) {}

  deleteTask() {
    this.httpService
      .deleteTask(this.boardId, this.columnId, this.taskData._id)
      .subscribe(() => {
        this.update.emit(this.taskData._id);
      });
    this.boardService.deleteTask(this.columnId, this.taskData._id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      data: {
        message:
          localStorage.getItem('lang') === 'ukr'
            ? 'Ви дісно бажаєте видалити задачу?'
            : 'Are you sure you want to delete task?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteTask();
      }
    });
  }

  openUpdateTaskDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: this.taskData.title,
      description: this.taskData.description,
    };

    const dialogRef = this.dialog.open(TaskUpdateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const editedTask = {
          ...this.taskData,
          ...result,
        };
        this.httpService
          .updateTask(this.boardId, editedTask.columnId, this.taskData._id, {
            order: this.taskData.order,
            title: editedTask.title,
            description: editedTask.description,
            columnId: this.columnId,
            userId: this.taskData.userId,
            users: this.taskData.users,
          })
          .subscribe({
            next: (newTask) => {
              if ('_id' in newTask) {
                this.boardService.updateTask(
                  this.taskData.order,
                  editedTask.title,
                  this.columnId,
                  editedTask.description
                );
              }
            },
          });
      }
    });
  }
  openDescription(): void {
    this.dialog.open(DescrDialogComponent, {
      data: this.taskData.description,
    });
  }

 
}
