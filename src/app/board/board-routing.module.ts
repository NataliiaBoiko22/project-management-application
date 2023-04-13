import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: ':id',
    component: PageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BoardRoutingModule {}
