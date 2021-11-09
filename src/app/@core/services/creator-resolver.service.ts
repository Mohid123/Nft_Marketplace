import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CreatorService } from './creator.service';

@Injectable()
export class CreatorResolver implements Resolve<any> {
  constructor(private creatorService: CreatorService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    if (route?.params?.clubName)
      return this.creatorService.getCreator(route?.params?.clubName);
    else
      return of(null);
  }
}
