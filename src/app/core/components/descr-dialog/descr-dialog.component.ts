import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-descr-dialog',
  templateUrl: './descr-dialog.component.html',
  styleUrls: ['./descr-dialog.component.scss'],
})
export class DescrDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public description: string,
    private dialogRef: MatDialogRef<DescrDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
