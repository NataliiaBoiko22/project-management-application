import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/core/types/users.types';
import { UsersService } from 'src/app/shared/services/users.service';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { Board } from 'src/app/core/types/board.types';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  appUsers: User[] = [];
  appBoards: Board[] = [];

  boardsForm: FormGroup = this.formBuilder.group({
    owner: [''],
    title: [''],
  });

  ownerControl: AbstractControl<string> = this.boardsForm.get('owner')!;
  titleControl: AbstractControl<string> = this.boardsForm.get('title')!;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.usersService.users$.subscribe((users) => {
      this.appUsers = users.sort(
        (a, b) =>
          a.name.toLowerCase().charCodeAt(0) -
          b.name.toLowerCase().charCodeAt(0)
      );
    });
    this.boardsService.boardsOnView$.subscribe((boards) => {
      this.appBoards = boards.sort(
        (a, b) =>
          a.title.toLowerCase().charCodeAt(0) -
          b.title.toLowerCase().charCodeAt(0)
      );
    });

    this.ownerControl.valueChanges.subscribe((owner) => {
      this.boardsService.owner = owner;
      this.boardsService.getFilterResults();
    });

    this.titleControl.valueChanges.subscribe((title) => {
      this.boardsService.title = title;
      this.boardsService.getFilterResultsTitle();
    });
  }

  ngOnDestroy(): void {
    this.boardsService.titleFilter = '';
    this.boardsService.owner = '';
    this.boardsService.getFilterResults();
  }
}
