import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material';
import { BoardBoxComponent } from './components/board-box/board-box.component';
import { LottieModule } from 'ngx-lottie';
import { FilterComponent } from './components/filter/filter.component';
import { BoardsPageComponent } from './boards-page/boards-page.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    ProfileComponent,
    BoardBoxComponent,
    FilterComponent,
    BoardsPageComponent,
    TaskItemComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LottieModule,
    SharedModule,
  ],
  exports: [TranslateModule, FormsModule, ReactiveFormsModule],
})
export class MainModule {}
