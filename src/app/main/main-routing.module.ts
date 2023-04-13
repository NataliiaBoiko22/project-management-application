import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsPageComponent } from './boards-page/boards-page.component';
const routes: Routes = [
  {
    path: '',
    component: BoardsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MainRoutingModule {}
