import { Injectable } from '@angular/core';
import { getItem, removeItem, setItem, StorageItem } from '@app/@core/utils';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));
  role$ = new BehaviorSubject<ROLE_TYPE_UTILS>(ROLE_TYPE_UTILS.noUser);


  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  get role(): ROLE_TYPE_UTILS {
    return this.role$.getValue();
  }

  signIn(): void {
    const token = Array(4)
      .fill(0)
      .map(() => Math.random() * 99)
      .join('-');

    setItem(StorageItem.Auth, token);
    this.isLoggedIn$.next(true);
  }

  signOut(): void {
    removeItem(StorageItem.Auth);
    this.isLoggedIn$.next(false);
    this.role$.next(ROLE_TYPE_UTILS.noUser);
  }
}
