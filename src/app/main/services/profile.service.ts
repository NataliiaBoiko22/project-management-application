import { Injectable } from '@angular/core';

import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { SignUpBody } from 'src/app/core/types/auth.types';
import { UsersService } from 'src/app/core/services/users.service';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  isLogInFromStorage = !!localStorage.getItem('token');

  isLogIn$ = new BehaviorSubject(this.isLogInFromStorage);

  constructor(
    private httpResponse: HttpService,
    private auth: AuthService,

    private userServiceAddition: UsersService
  ) {}

  updateUser(userId: string, data: SignUpBody): void {
    this.httpResponse.updateUser(userId, data).subscribe((resp) => {
      if (typeof resp === 'object' && '_id' in resp) {
        this.updateUsersList();
      }
    });
  }

  deleteUser(userId: string): void {
    this.httpResponse.deleteUser(userId).subscribe((resp) => {
      if (typeof resp === 'object' && '_id' in resp) {
        this.auth.logOut();
      } else {
        return;
      }
    });
    this.updateUsersList();
  }

  updateUsersList(): void {
    this.httpResponse.getUsers().subscribe((users) => {
      if (Array.isArray(users)) {
        this.userServiceAddition.users$.next(users);
      }
    });
  }
}
