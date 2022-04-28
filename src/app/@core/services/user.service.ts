import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BecomeCreator } from '../models/become-a-creator.model';
import { ApiResponse } from '../models/response.model';
import { NodechainUser } from './../models/nodechain-user.model';
import { ApiService } from './api.service';

type User = NodechainUser | BecomeCreator;
@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<User> {

  constructor(
    protected http: HttpClient
  ) {
    super(http);
   }

   createUser(payload: NodechainUser): Observable<ApiResponse<User>> {
    return this.post('/nodechain-users/createUser', payload)
   }

   becomeCreator(payload: BecomeCreator): Observable<ApiResponse<User>> {
     return this.post('/nodechain-users/becomeCreator', payload)
   }
}
