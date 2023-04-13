import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Board } from 'src/app/core/types/board.types';
import { Task } from 'src/app/core/types/tasks.types';
import { HttpService } from 'src/app/core/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { BoardAddDialogComponent } from 'src/app/core/components/board-add-dialog/board-add-dialog.component';
import { TasksService } from '../services/tasks.service';
@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  boardItems: Board[] = [];

  taskItems: Task[] = [];

  activeLink: string = 'boards';

  constructor(
    private httpService: HttpService,
    private boardsService: BoardsService,
    private usersService: UsersService,
    private tasksService: TasksService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.boardsService.boardsOnView$.subscribe((boards) => {
      this.boardItems = boards;
    });

    this.httpService
      .getUsers()
      .pipe(
        switchMap((res) => {
          if (res instanceof Array) {
            this.usersService.users$.next(res);
          }
          return this.usersService.users$;
        })
      )
      .subscribe();

    this.tasksService.tasks$.subscribe((tasks) => {
      this.taskItems = tasks;
    });

    this.httpService
      .getAllBoards()
      .pipe(
        switchMap((res) => {
          if (res instanceof Array) {
            this.boardsService.boards$.next(res);
            this.boardsService.getFilterResults();
          }
          return this.boardsService.boards$;
        })
      )
      .subscribe();
  }
  openDialogBoard(): void {
    this.dialog.open(BoardAddDialogComponent);
  }
}
