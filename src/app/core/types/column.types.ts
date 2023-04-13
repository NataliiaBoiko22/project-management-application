export interface ColumnBody {
  title: string;
  order: number;
}

export interface ColumnSetBody extends ColumnBody {
  boardId: string;
}

// export interface Column extends ColumnSetBody {
//   _id: string;
// }
export interface Column extends ColumnSetBody {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}
export interface ColumnOrderPatchBody {
  _id: string;
  order: number;
}
