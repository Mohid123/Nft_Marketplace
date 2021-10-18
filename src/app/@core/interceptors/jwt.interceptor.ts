import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const isLoggedIn = true;
    const token = 'ABC';
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      map((response: any) => {
        if (response.status) {
          response.body = {
            status: [200,201,204].includes(response.status),
            data: response.body,
          };
        }
        return response;
      }),
    );
  }
}
