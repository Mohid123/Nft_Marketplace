import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getItem, removeItem, setItem, StorageItem } from '@app/@core/utils';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthCredentials } from './../../../@core/models/auth-credentials.model';
import { ApiService } from './../../../@core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));
  role$ = new BehaviorSubject<ROLE_TYPE_UTILS>((<ROLE_TYPE_UTILS>getItem(StorageItem.Role)));

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {}

  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  get role(): ROLE_TYPE_UTILS {
    return this.role$.getValue();
  }

  userSignIn(params:AuthCredentials): Observable<any> {
    return this.apiService.post('/auth/loginForNftPanel',params).pipe(tap(result=> {
      if(result.status) {
        console.log('auth result:',result);
        setItem(StorageItem.Auth, result.data?.nftJwtToken?.access_token);
        setItem(StorageItem.Role, ROLE_TYPE_UTILS.user);
        this.isLoggedIn$.next(true);
        this.role$.next(ROLE_TYPE_UTILS.user);
      }
    }))
  }

  adminSignIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const token = Array(4)
        .fill(0)
        .map(() => Math.random() * 99)
        .join('-');

      setItem(StorageItem.Auth, token);
      setItem(StorageItem.Role, ROLE_TYPE_UTILS.admin);
      this.isLoggedIn$.next(true);
      this.role$.next(ROLE_TYPE_UTILS.admin);
      resolve(true);
    });
  }

  signOut(): void {
    removeItem(StorageItem.Auth);
    removeItem(StorageItem.Key);
    this.isLoggedIn$.next(false);
    this.role$.next(ROLE_TYPE_UTILS.noUser);
  }
}
