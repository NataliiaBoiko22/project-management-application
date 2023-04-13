import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingupComponent } from './components/singup/singup.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { MaterialModule } from '../material/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SinginComponent } from './components/singin/singin.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../core/services/http.service';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from '../main/main-routing.module';
@NgModule({
  declarations: [SingupComponent, SinginComponent, AuthPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule,
    TranslateModule,
    SharedModule,
    MainRoutingModule,
  ],
  providers: [HttpService],
})
export class AuthModule {}
