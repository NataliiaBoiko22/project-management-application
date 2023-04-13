import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { BoardService } from '../../services/board.service';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  
  
  @Output() public modalClose: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Input() columnId!: string;

  @Input() boardId!: string;

  formGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  public closeModal(): void {
    this.modalClose.emit(true);
  }

  constructor(
    private httpService: HttpService,
    private boardService: BoardService
  ) {}

  createTask(): void {
    this.httpService
      .createTask(this.boardId, this.columnId, {
        ...this.formGroup.value,
        order: this.boardService.getMaxOrderTask(this.columnId),
        userId: localStorage.getItem('userId'),
        users: [],
      })
      .subscribe((task) => {
        if ('_id' in task) {
          this.boardService.addTask(task, this.columnId);
        }
      });
   
    this.closeModal();
  }

}
