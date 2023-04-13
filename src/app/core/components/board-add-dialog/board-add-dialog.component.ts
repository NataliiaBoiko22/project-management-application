import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-board-add-dialog',
  templateUrl: './board-add-dialog.component.html',
  styleUrls: ['./board-add-dialog.component.scss'],
})
export class BoardAddDialogComponent {
  constructor(public dialogRef: MatDialogRef<BoardAddDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
