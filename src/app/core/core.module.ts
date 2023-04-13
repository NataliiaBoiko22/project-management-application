import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './services/http.service';
import { MaterialModule } from '../material/material';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { InterceptorService } from './services/interceptor.service';
import { InvalidTokenInterceptor } from './interceptors/invalid-token.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { BoardAddDialogComponent } from './components/board-add-dialog/board-add-dialog.component';
import { BoardAddFormComponent } from './components/board-add-form/board-add-form.component';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';
import { DescrDialogComponent } from './components/descr-dialog/descr-dialog.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    WelcomeComponent,

    MatDialogComponent,
    BoardAddDialogComponent,
    BoardAddFormComponent,
    CustomSnackbarComponent,
    DescrDialogComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InvalidTokenInterceptor,
      multi: true,
    },
  ],
  exports: [HeaderComponent, MaterialModule, TranslateModule, FooterComponent],
})
export class CoreModule {}
