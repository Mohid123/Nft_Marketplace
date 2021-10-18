/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'LOCALE': 'en',
      'Accept': 'application/json',
      'access-control-allow-origin': '*'
    };
    return new HttpHeaders(headersConfig);
  }

  // private formatErrors(error: any) {
  //   // if (error.status === 401) {
  //   //   this.router.navigateByUrl('/logout');
  //   // }
  //   return error && error.messages || throwError(error);
  //   //return error.error;
  // }

  get(path: string, params?: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { headers: this.setHeaders(), params });
    // .pipe(catchError(error => this.formatErrors(error)));
  }

  put(path: string, body: any = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    // .pipe(catchError(error => this.formatErrors(error)));
  }

  post(path: string, body: any = {}, options: any = {}): Observable<any> {
    if (options.responseType) {
      return this.http.post(
        `${environment.apiUrl}${path}`,
        JSON.stringify(body),
        { responseType: options.responseType, headers: this.setHeaders() }
      );
    } else {
      return this.http.post(
        `${environment.apiUrl}${path}`,
        JSON.stringify(body),
        { headers: this.setHeaders() }
      );
      // .catch(error => error);
    }
  }

  delete(path:string): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`,
      { headers: this.setHeaders() }
    )
  }

  extrnalPost(path: string, body: any = {}, options: any = {}): Observable<any> {
    if (options.responseType) {
      return this.http.post(
        `${path}`,
        JSON.stringify(body),
        { responseType: options.responseType, headers: this.setHeaders() }
      );
    } else {
      return this.http.post(
        `${path}`,
        JSON.stringify(body),
        { headers: this.setHeaders() }
      );
      // .catch(error => error);
    }
  }
}
