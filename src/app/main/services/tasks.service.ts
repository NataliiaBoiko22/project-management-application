import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/core/types/tasks.types';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  owner: string = '';

  board: string = '';

  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  tasksSet$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(
  ) {}

}
