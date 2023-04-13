import { Component, EventEmitter, Output } from '@angular/core';
import { Column } from 'src/app/core/types/column.types';
import { ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/core/types/tasks.types';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatDialogComponent } from 'src/app/core/components/mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() columnData!: Column;

  @Input() columnsIds!: string[];

  @Input() boardId!: string;

  @Output() update = new EventEmitter<string>();

  @ViewChild('titleInput') titleInputEl!: ElementRef<HTMLElement>;

  tasksData: Task[] = [];

  data: string[] = [];

  titleControl = new FormControl();

  isRedactTitle: boolean = false;

  isTitleUpdatingProgress: boolean = false;

  public isCreateVisible: boolean = false;
  public isImportant: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private boardService: BoardService,

    public dialog: MatDialog
   
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.boardId = params['id'];
    });

    this.boardService.tasks[this.columnData._id].subscribe((task) => {
      this.tasksData = task;
    });

    this.getTasks();

    this.titleControl.setValidators(Validators.required);
  }
  private getTasks() {
    setTimeout(() => {
      this.httpService
        .getAllTasks(this.boardId, this.columnData._id)
        .subscribe((tasks) => {
          if (Array.isArray(tasks)) {
            this.boardService.tasks[this.columnData._id].next(
              tasks.sort((a, b) => a.order - b.order)
            );
          }
        });
    }, 0);
  }

  openDialog() {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      data: {
        message:
          localStorage.getItem('lang') === 'ukr'
            ? 'Ви дісно бажаєте видалити колонку?'
            : 'Are you sure you want to delete column?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteColumn();
      }
    });
  }

  deleteColumn() {
    this.httpService
      .deleteColumn(this.boardId, this.columnData._id)
      .subscribe(() => {
        this.update.emit(this.columnData._id);
      });
    this.boardService.deleteColumn(this.columnData._id);
  }

  showInput() {
    this.isRedactTitle = true;
    this.titleControl.setValue(this.columnData.title);
  }

  updateTitle(): void {
    this.isTitleUpdatingProgress = true;
    this.titleControl.disable();
    console.log(this.columnData._id);
    this.httpService
      .updateColumn(this.boardId, this.columnData._id, {
        order: this.columnData.order,
        title: this.titleControl.value,
      })
      .subscribe({
        next: (newCol) => {
          if ('_id' in newCol) {
            this.boardService.updateColumnTitle(
              this.columnData.order,
              newCol.title
            );
          }
        },
        complete: () => {
          this.isRedactTitle = false;
          this.isTitleUpdatingProgress = false;
          this.titleControl.enable();
        },
      });
  }

  hideInput(): void {
    this.isRedactTitle = false;
  }

  openDialogTask(): void {
    this.dialog.open(TaskDialogComponent, {
      data: {
        boardId: this.boardId,
        columnId: this.columnData._id,
      },
    });
  }

  public closeModal(): void {
    this.isCreateVisible = false;
  }

  drop(event: CdkDragDrop<Task[]>): void {
    const columnId = event.container.id.slice(2);
    const taskArrDubl = [...this.tasksData];

    if (event.previousContainer === event.container) {
      if (event.previousIndex !== event.currentIndex) {
        moveItemInArray<Task>(
          this.tasksData,
          event.previousIndex,
          event.currentIndex
        );
        this.boardService.updateTaskInd(columnId);
        this.httpService
          .updateArrOfTasks(
            this.boardService.getNewTaskOrder(this.columnData._id)
          )
          .subscribe((res) => {
            if (Number.isFinite(res)) {
              this.boardService.tasks[this.columnData._id].next(taskArrDubl);
            }
          });
      }
    } else {
      transferArrayItem<Task>(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.boardService.updateColIdInTask(columnId, event.currentIndex);
      this.boardService.updateTaskInd(columnId);
      const tasksArrNewOrder = [...this.boardService.getNewTaskOrder(columnId)];
      this.httpService.updateArrOfTasks(tasksArrNewOrder).subscribe((res) => {
        if (Number.isFinite(res)) {
          this.boardService.tasks[columnId].next(taskArrDubl);
        }
      });
    }
  }
}
