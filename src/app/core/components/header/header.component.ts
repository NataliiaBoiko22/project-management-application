import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

import { TranslateService } from '@ngx-translate/core';

import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from 'src/app/main/components/profile/profile.component';
import { Router } from '@angular/router';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { BoardAddDialogComponent } from '../board-add-dialog/board-add-dialog.component';
import { UsersService } from 'src/app/shared/services/users.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isSingIn = false;

  isSingInBehavior = this.auth.isSingIn$.subscribe((value) => {
    this.isSingIn = value;
    return value;
  });
  constructor(
    private auth: AuthService,
    public userService: UsersService,

    public translate: TranslateService,
    public prof: MatDialog,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.translate.currentLang = localStorage.getItem('lang') || 'en';
  }

  goToMain(): void {
    this.router.navigate(['main']);
  }
  openProfileUser(): void {
    this.prof.open(ProfileComponent);
  }

  logOut(): void {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      data: {
        message:
          localStorage.getItem('lang') === 'ukr'
            ? 'Ви дісно бажаєте вийти?'
            : 'Are you sure you want to logout?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.auth.logOut();
        localStorage.clear();
        this.router.navigateByUrl('/welcome');
      }
    });
  }

  saveToLocal(lang: string): void {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }
  openDialogBoard(): void {
    this.dialog.open(BoardAddDialogComponent);
  }
  toWelcomePage(){
  
    this.router.navigate(['welcome']);
  }
}
