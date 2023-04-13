import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board } from 'src/app/core/types/board.types';
import { UsersService } from 'src/app/core/services/users.service';
import { HttpService } from 'src/app/core/services/http.service';
@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  boardsOnView$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  titleFilter: string = '';
  title: string = '';
  owner: string = '';
  users: string[] = [];

  constructor(
    private usersService: UsersService,
    private httpService: HttpService
  ) {}

  addBoard(board: Board): void {
    const boards = this.boards$.getValue();
    boards.push(board);
    this.boards$.next(boards);
    this.getFilterResults();
    this.getFilterResultsTitle();
  }

  deleteBoard(id: string): void {
    const boards = this.boards$.getValue();
    this.boards$.next(boards.filter((board) => board._id !== id));
    this.getFilterResults();
    this.getFilterResultsTitle();
  }

  getName(boardId: string): string {
    return (
      this.boards$.getValue().find((board) => board._id === boardId)?.title ||
      ''
    );
  }

  hasBoard(boardId: string): boolean {
    return !!this.boards$.getValue().find((board) => board._id === boardId);
  }

  getFilterResults(): void {
    this.boardsOnView$.next(this.filterResults(this.boards$.getValue()));
  }

  private filterResults(boards: Board[]): Board[] {
    return boards
      .filter((board) => this.isIncludedTitle(board))
      .filter((board) => this.isIncludedUser(board));
  }
  getFilterResultsTitle(): void {
    this.boardsOnView$.next(this.filterResultsTitle(this.boards$.getValue()));
  }
  private filterResultsTitle(boards: Board[]): Board[] {
    return boards.filter((board) => this.isIncludedTitle(board));
  }

  private isIncludedTitle(board: Board): boolean {
    return this.title ? board.title.toLowerCase().includes(this.title) : true;
  }

  private isIncludedUser(board: Board): boolean {
    return this.owner ? board.owner === this.owner : true;
  }
}
