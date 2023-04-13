import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material';
import { BoardRoutingModule } from './board-routing.module';
import { PageComponent } from './page/page.component';
import { ColumnDialogComponent } from './components/column-dialog/column-dialog.component';
import { ColumnFormComponent } from './components/column-form/column-form.component';
import { ColumnComponent } from './components/column/column.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskComponent } from './components/task/task.component';
import { TaskUpdateComponent } from './components/task-update/task-update.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    PageComponent,
    ColumnDialogComponent,
    ColumnFormComponent,
    ColumnComponent,
    TaskDialogComponent,
    TaskFormComponent,
    TaskComponent,
    TaskUpdateComponent,
 
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MaterialModule,

    HttpClientModule,
    TranslateModule,
    SharedModule,
    DragDropModule,
   
  ],
})
export class BoardModule {}
