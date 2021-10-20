/* eslint-disable @typescript-eslint/no-explicit-any */
import { NFTList } from './NFTList.model';
import { SignInResponse } from './sign-in-response';
export interface Response {
  status: boolean;
  data: NFTList | SignInResponse | any;
}

export class ApiResponse<T> {
  headers: any;
  constructor() {
    this.errors = [];
  }
  status: boolean;
  data: T;
  errors?: ApiError[] | any;
  getErrorsText(): string {
    return this.errors.map((e:any) => e.text).join(' ');
  }
  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}

export class ApiError {
  code: ErrorCode;
  text: string;
}

export enum ErrorCode {
  UnknownError = 1,
  OrderIsOutdated = 2
}
