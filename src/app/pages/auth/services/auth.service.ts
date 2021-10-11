import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getItem, removeItem, setItem, StorageItem } from '@app/@core/utils';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));
  role$ = new BehaviorSubject<ROLE_TYPE_UTILS>((<ROLE_TYPE_UTILS>getItem(StorageItem.role)));

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  get role(): ROLE_TYPE_UTILS {
    return this.role$.getValue();
  }

  userSignIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const token = Array(4)
        .fill(0)
        .map(() => Math.random() * 99)
        .join('-');

      setItem(StorageItem.Auth, token);
      setItem(StorageItem.role, ROLE_TYPE_UTILS.user);
      this.isLoggedIn$.next(true);
      this.role$.next(ROLE_TYPE_UTILS.user);
      resolve(true);
    });
  }

  adminSignIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const token = Array(4)
        .fill(0)
        .map(() => Math.random() * 99)
        .join('-');

      setItem(StorageItem.Auth, token);
      setItem(StorageItem.role, ROLE_TYPE_UTILS.admin);
      this.isLoggedIn$.next(true);
      this.role$.next(ROLE_TYPE_UTILS.admin);
      resolve(true);
    });
  }

  signOut(): void {
    removeItem(StorageItem.Auth);
    this.isLoggedIn$.next(false);
    this.role$.next(ROLE_TYPE_UTILS.noUser);
  }
}
