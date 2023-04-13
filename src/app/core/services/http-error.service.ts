import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  constructor() {}

  catchErrors(err: HttpErrorResponse): Observable<never>;

  catchErrors(
    err: HttpErrorResponse,
    isReturnStatus: boolean
  ): Observable<never> | number;

  catchErrors(err: HttpErrorResponse, isReturnStatus?: boolean): unknown {
    if (isReturnStatus !== undefined) {
      return isReturnStatus ? err.status : EMPTY;
    } else {
      return EMPTY;
    }
  }
}
