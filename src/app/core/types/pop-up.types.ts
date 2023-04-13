import { HttpErrorResponse } from '@angular/common/http';
import { ClientError, ServerError } from './http.types';

export interface PopUpData {
  title: string;
  description: string;
  payload?: string;
}

export interface PopUpProperties {
  data: PopUpData;
  type: PopUpTypes;
}

export type PopUpTypes = 'confirm' | 'message';

export type PopUpResultType = 'confirm' | 'skip' | 'close';

export interface DialogData {
  message: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
}
