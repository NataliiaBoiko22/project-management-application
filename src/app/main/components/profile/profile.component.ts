import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { HttpService } from 'src/app/core/services/http.service';
import { SignUpBody } from 'src/app/core/types/auth.types';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from 'src/app/core/components/mat-dialog/mat-dialog.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  patterns = {
    MIN_LENGTH: 4,
    MAX_LENGTH: 20,
    PATTERN_NAME: /^[a-z0-9]+$/,
    PATTERN_PASSWORD:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  };
  userUpdateForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(this.patterns.MIN_LENGTH),
      Validators.maxLength(this.patterns.MAX_LENGTH),
      Validators.pattern(this.patterns.PATTERN_NAME),
    ]),
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.patterns.MIN_LENGTH),
      Validators.maxLength(this.patterns.MAX_LENGTH),
      Validators.pattern(this.patterns.PATTERN_PASSWORD),
    ]),
  });

  controlName = this.userUpdateForm.get('name') as FormControl;

  controlLogin = this.userUpdateForm.get('login') as FormControl;

  controlPassword = this.userUpdateForm.get('password') as FormControl;

  constructor(
    private profileService: ProfileService,
    private httpService: HttpService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    const userId = localStorage.getItem('userId') as string;

    this.httpService.getUser(userId).subscribe((value) => {
      if ('_id' in value) {
        this.controlName.setValue(value.name);
        this.controlLogin.setValue(value.login);
      }
      return value;
    });
  }

  changeUserData(): void {
    if (this.userUpdateForm.invalid) {
      return;
    }
    const data = this.userUpdateForm.value as SignUpBody;
    const userId = localStorage.getItem('userId') as string;
    this.profileService.updateUser(userId, data);
  }

  deleteUser(): void {
    const userId = localStorage.getItem('userId') as string;
    this.profileService.deleteUser(userId);
  }
  openDialog() {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      data: {
        message:
          localStorage.getItem('lang') === 'ukr'
            ? 'Ви дісно бажаєте видалити ваш акаунт?'
            : 'Are you sure you want to delete your account?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser();
      }
    });
  }
}
