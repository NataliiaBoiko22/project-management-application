import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/core/types/board.types';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { HttpService } from 'src/app/core/services/http.service';
import { MatDialogComponent } from 'src/app/core/components/mat-dialog/mat-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-board-box',
  templateUrl: './board-box.component.html',
  styleUrls: ['./board-box.component.scss'],
})
export class BoardBoxComponent {
  @Input() boardData!: Board;

  constructor(
    private router: Router,
    private boardsService: BoardsService,
    private httpService: HttpService,
    public dialog: MatDialog
  ) {}

  navigate(): void {
    this.router.navigate(['board', this.boardData._id]);
  }
  openDialog($event: Event) {
    $event.stopPropagation();
    const dialogRef = this.dialog.open(MatDialogComponent, {
      data: {
        message:
          localStorage.getItem('lang') === 'ukr'
            ? 'Ви дісно бажаєте видалити дошку?'
            : 'Are you sure you want to delete board?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete($event);
      }
    });
  }
  delete($event: Event) {
    $event.stopPropagation();
    return this.httpService.deleteBoard(this.boardData._id).subscribe(() => {
      this.boardsService.deleteBoard(this.boardData._id);
    });
  }
}
