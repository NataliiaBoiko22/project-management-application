import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { SinginComponent } from './components/singin/singin.component';
import { SingupComponent } from './components/singup/singup.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: SinginComponent, pathMatch: 'full' },
      { path: 'singup', component: SingupComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
