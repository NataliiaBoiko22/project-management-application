import { Component } from '@angular/core';
import { ColumnDialogComponent } from '../components/column-dialog/column-dialog.component';
import { Column } from 'src/app/core/types/column.types';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { BoardService } from '../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Board } from 'src/app/core/types/board.types';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  boardId!: string;
  boardItems: Board[] = [];

  columns: Column[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private boardService: BoardService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(map((params) => params['id']))
      .subscribe((id) => {
        this.boardId = id;
      });
    this.boardService.columns.subscribe((cols) => {
      this.columns = cols;
    });

    this.getColumns();
  }

  goToMain(): void {
    this.router.navigate(['main']);
  }

  getArrColId(): string[] {
    return this.columns.map((col) => `ID${col._id}`);
  }

  private getColumns(): void {
    setTimeout(() => {
      this.httpService.getAllColumns(this.boardId).subscribe((cols) => {
        if (Array.isArray(cols)) {
          this.boardService.columns.next(
            cols.sort((a, b) => a.order - b.order)
          );
          this.boardService.fillTaskObject();
        }
      });
    }, 0);
  }

  openDialogColumn(): void {
    this.dialog.open(ColumnDialogComponent, {
      data: {
        boardId: this.boardId,
      },
    });
  }
  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      const columnsArr = [...this.columns];
      moveItemInArray<Column>(
        this.columns,
        event.previousIndex,
        event.currentIndex
      );
      this.httpService
        .updateArrOfCol(this.boardService.getNewColOrder())
        .subscribe((res) => {
          if (typeof res === 'number') {
            this.boardService.columns.next(columnsArr);
          }
        });
    }
  }
}
