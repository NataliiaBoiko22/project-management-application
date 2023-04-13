import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types/users.types';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  getName(id: string): string {
    return (
      this.users$.getValue().find((user) => user._id === id)?.name ||
      ''
    );
  }


}
