import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SignInBody } from '../../../core/types/auth.types';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss'],
})
export class SinginComponent {
  constructor(private auth: AuthService) {}
  patterns = {
    MIN_LENGTH: 8,
    PATTERN_PASSWORD:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  };
  authForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.patterns.MIN_LENGTH),
      Validators.pattern(this.patterns.PATTERN_PASSWORD),
    ]),
  });
  controlLogin = this.authForm.get('login') as FormControl;
  controlPassword = this.authForm.get('password') as FormControl;
  onSingInButton(): void {
    const data = this.authForm.value as SignInBody;
    localStorage.setItem('login', data.login);
    if (this.authForm.invalid) {
      return;
    }
    this.auth.singIn(data);
  }
}
