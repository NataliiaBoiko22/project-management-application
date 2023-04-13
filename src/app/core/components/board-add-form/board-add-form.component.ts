import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { User } from '../../types/users.types';
import { FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Board } from '../../types/board.types';

import { Router } from '@angular/router';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
import { EventEmitter } from '@angular/core';
interface Translate {
  part1: string;
  part2: string;
}

@Component({
  selector: 'app-board-add-form',
  templateUrl: './board-add-form.component.html',
  styleUrls: ['./board-add-form.component.scss'],
})
export class BoardAddFormComponent implements OnInit {
  @Output() public modalClose: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  appUsers: User[] = [];

  selectedUsers: User[] = [];

  private message: string = 'test';

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private boardsService: BoardsService,
    private usersService: UsersService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    public router: Router
  ) {}

  boardForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    users: [[]],
  });

  ngOnInit(): void {
    this.usersService.users$.subscribe((users) => {
      this.appUsers = users;
    });
  }
  public closeModal(): void {
    this.modalClose.emit(true);
  }
  createBoard(): void {
    const board = {
      title: this.boardForm.get('title')?.value as string,
      owner: localStorage.getItem('userId') || '',
      users: this.boardForm.get('users')?.value as string[],
    };
    this.httpService.createBoard(board).subscribe((res) => {
      if ((res as Board)._id) {
        this._snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message:
              localStorage.getItem('lang') === 'ukr'
                ? `Дошка '${this.boardForm.get('title')?.value}' створена!`
                : `The board '${this.boardForm.get('title')?.value}' created!`,
            snackBar: this._snackBar,
          },
          panelClass: ['snackbar-container'],

          duration: 3000,
        });
        this.boardForm.reset();
        this.boardsService.addBoard(res as Board);
      }
    });
  }

  getListUser() {
    return this.usersService.getName(this.boardForm.get('users')?.value?.[0]);
  }
}
