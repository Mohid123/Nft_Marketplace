import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NodechainUser } from './../models/nodechain-user.model';

@Injectable({
  providedIn: 'root'
})
export class ConnService {
  private userCredentials: BehaviorSubject<NodechainUser> = new BehaviorSubject<NodechainUser>({});

  sendUserCredentials(data: any) {
    this.userCredentials.next(data);
  }

  getUserCredentials():Observable<any> {
    return this.userCredentials.asObservable();
  }

}
