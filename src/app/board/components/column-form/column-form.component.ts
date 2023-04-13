import { Component, Input, Output } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { BoardService } from '../../services/board.service';
import { EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent {
  @Input() boardId!: string;
  @Output() public modalClose: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  columnForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private boardService: BoardService
  ) {}
  public closeModal(): void {
    this.modalClose.emit(true);
  }
  createColumn(): void {
    this.httpService
      .createColumn(this.boardId, {
        ...this.columnForm.value,
        order: this.boardService.getMaxOrderCol(),
      })
      .subscribe((col) => {
        if ('_id' in col) {
          this.boardService.addColumn(col);
        }
      });
  }
}
