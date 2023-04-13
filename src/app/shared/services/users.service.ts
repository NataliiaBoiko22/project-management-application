import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/types/users.types';
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

  isDeletedUser(id: string): boolean {
    return !this.users$.getValue().find((user) => user._id === id);
  }
}
