import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpBody } from 'src/app/core/types/auth.types';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
})
export class SingupComponent {
  patterns = {
    MIN_LENGTH: 4,
    MAX_LENGTH: 20,
    PATTERN_NAME: /^[a-z0-9]+$/,
    PATTERN_PASSWORD:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  };
  authForm = new FormGroup({
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

  controlName = this.authForm.get('name') as FormControl;

  controlLogin = this.authForm.get('login') as FormControl;

  controlPassword = this.authForm.get('password') as FormControl;

  constructor(private auth: AuthService) {}

  onSingUpButton(): void {
    if (this.authForm.invalid) {
      return;
    }
    const data = this.authForm.value as SignUpBody;
    this.auth.signUp(data);
  }
}
