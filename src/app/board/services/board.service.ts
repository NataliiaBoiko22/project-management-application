import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Column, ColumnOrderPatchBody } from 'src/app/core/types/column.types';
import {
  Task,
  TaskSubject,
  TaskUpdateBody,
} from 'src/app/core/types/tasks.types';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  columns: BehaviorSubject<Column[]> = new BehaviorSubject<Column[]>([]);

  tasks: TaskSubject = {};

  constructor() {}

  addColumn(col: Column): void {
    this.tasks[col._id] = new BehaviorSubject<Task[]>([]);
    this.columns.getValue().push(col);
  }

  getMaxOrderCol(): number {
    return this.columns.getValue().length
      ? Math.max(...this.columns.getValue().map((col) => col.order)) + 1
      : 0;
  }
  deleteColumn(id: string) {
    this.columns.next(this.columns.getValue().filter((col) => col._id !== id));
  }

  addTask(task: Task, colId: string): void {
    this.tasks[colId].getValue().push(task);
  }
  getMaxOrderTask(colId: string): number {
    return this.tasks[colId].getValue().length
      ? Math.max(...this.tasks[colId].getValue().map((task) => task.order)) + 1
      : 0;
  }
  deleteTask(colId: string, id: string) {
    console.log(this.tasks[colId]);
    this.tasks[colId].next(
      this.tasks[colId].getValue().filter((task) => task._id !== id)
    );
  }

  fillTaskObject(): void {
    this.columns.getValue().forEach((col) => {
      this.tasks[col._id] = new BehaviorSubject<Task[]>([]);
    });
  }

  updateColumnTitle(order: number, title: string): void {
    this.columns.getValue()[order].title = title;
  }

  updateTask(
    order: number,
    title: string,
    colId: string,
    description: string
  ): void {
    this.tasks[colId].getValue()[order].title = title;
    this.tasks[colId].getValue()[order].description = description;
  }

  updateArrayIndexes(arr: (Column | Task)[]): Array<Column | Task> {
    return arr.map((item, ind) => {
      return { ...item, order: ind };
    });
  }

  hasColumns(): boolean {
    return !!this.columns.getValue().length;
  }

  hasTasks(colId: string): boolean {
    return !!this.tasks[colId].getValue().length;
  }
  getNewColOrder(): ColumnOrderPatchBody[] {
    return this.columns.getValue().map((col, ind) => {
      return {
        _id: col._id,
        order: ind,
      };
    });
  }

  // .....................................
  updateTaskInd(colId: string): void {
    this.tasks[colId].getValue().forEach((task, ind) => {
      task.order = ind;
    });
  }
  updateColIdInTask(colId: string, position: number): void {
    this.tasks[colId].getValue()[position].columnId = colId;
  }
  getNewTaskOrder(colId: string): TaskUpdateBody[] {
    return this.tasks[colId].getValue().map((task, ind) => {
      return {
        _id: task._id,
        order: ind,
        columnId: task.columnId,
      };
    });
  }
}
