import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpCredentials } from '@app/@core/models/sign-up-credentials';
import { getItem, removeItem, setItem, StorageItem } from '@app/@core/utils';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { AuthCredentials } from './../../../@core/models/auth-credentials.model';
import { LoggedInUser } from './../../../@core/models/logged-in-user.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { SignInResponse } from './../../../@core/models/sign-in-response';
import { User } from './../../../@core/models/user.model';
import { ApiService } from './../../../@core/services/api.service';

type AuthApiData = SignInResponse;
@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService<AuthApiData> {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(
    !!getItem(StorageItem.LoggedInUser),
  );
  public readonly isLoggedIn$: Observable<boolean> =
    this._isLoggedIn$.asObservable();

  private _user$ = new BehaviorSubject<User>(<User>getItem(StorageItem.User));
  public readonly user$: Observable<User> = this._user$.asObservable();

  private _loggedInUser$ = new BehaviorSubject<LoggedInUser>(
    <LoggedInUser>getItem(StorageItem.LoggedInUser),
  );
  public readonly loggedInUser$: Observable<LoggedInUser> =
    this._loggedInUser$.asObservable();

  private _role$ = new BehaviorSubject<ROLE_TYPE_UTILS>(
    <ROLE_TYPE_UTILS>getItem(StorageItem.Role),
  );
  public readonly role$: Observable<ROLE_TYPE_UTILS> =
    this._role$.asObservable();

  constructor(protected http: HttpClient, private router: Router) {
    super(http);
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn$.getValue();
  }

  get loggedInUser(): LoggedInUser {
    return this._loggedInUser$.getValue() || null;
  }

  get role(): ROLE_TYPE_UTILS {
    return this._role$.getValue();
  }

  get user(): User {
    return this._user$.getValue();
  }

  get JwtToken(): string {
    return getItem(StorageItem.JwtToken)?.toString() || '';
  }

  userSignIn(params: AuthCredentials,adminCheck:boolean): Observable<ApiResponse<SignInResponse>> {
    return this.post('/auth/loginForNftPanel', params).pipe(
      tap((result: ApiResponse<SignInResponse>) => {
        if (!result.hasErrors()) {
          const role = result?.data?.user.admin ? ROLE_TYPE_UTILS.admin : ROLE_TYPE_UTILS.user;
          setItem(StorageItem.Role, role);
          setItem(StorageItem.User, result?.data?.user || null);
          setItem(StorageItem.LoggedInUser, result?.data?.loggedInUser || null);
          setItem(StorageItem.JwtToken, result?.data?.nftJwtToken?.access_token || null);
          setItem(StorageItem.ActiveClub, params.clubName);
          setItem(StorageItem.LastRole,role);
          this._isLoggedIn$.next(true);
          this._user$.next(result?.data?.user || null);
          this._loggedInUser$.next(result?.data?.loggedInUser || null);
          this._role$.next(role);
          if(adminCheck && result?.data?.user?.admin) {
            this.router.navigate(['/'+ params.clubName + '/admin'])
          } else {
            location.reload();
          }
        }
      }),
    );
  }

  userSignUp(params: SignUpCredentials,adminCheck:boolean): Observable<ApiResponse<SignInResponse>> {
    return this.post('/nodechain-users/createUser', params).pipe(
      take(1),
      exhaustMap((result: ApiResponse<any>) => {
        if (!result.hasErrors()) {
          const authParams: AuthCredentials = {
            email: params.email,
            pass:  params.pass,
            clubName: params.clubName,
          };
          return this.userSignIn(authParams, adminCheck)
        } else {
          return of(result);
        }
      }),
    );
  }

  adminSignIn(params: AuthCredentials): Observable<ApiResponse<SignInResponse>> {
    return this.post('/auth/loginForNftPanel', params).pipe(
      tap((result: ApiResponse<SignInResponse>) => {
        if (!result.hasErrors()) {
          setItem(StorageItem.Role, ROLE_TYPE_UTILS.admin);
          setItem(StorageItem.User, result?.data?.user || null);
          setItem(StorageItem.LoggedInUser, result?.data?.loggedInUser || null);
          setItem(StorageItem.JwtToken, result?.data?.nftJwtToken?.access_token || null);
          setItem(StorageItem.ActiveClub, params.clubName);
          setItem(StorageItem.LastRole, ROLE_TYPE_UTILS.admin);
          this._isLoggedIn$.next(true);
          this._user$.next(result?.data?.user || null);
          this._loggedInUser$.next(result?.data?.loggedInUser || null);
          this._role$.next(ROLE_TYPE_UTILS.admin);
        }
      }),
    );
  }

  clubChanged(newClub:string):void {
    const activeClub = getItem(StorageItem.ActiveClub);
    if(activeClub && activeClub == newClub) {
      setItem(StorageItem.Role, getItem(StorageItem.ActiveClub));
      this._role$.next(<ROLE_TYPE_UTILS>getItem(StorageItem.LastRole));
      if(this.user)
        this._isLoggedIn$.next(true);
    } else {
      removeItem(StorageItem.Role);
      this._role$.next(ROLE_TYPE_UTILS.noUser);
      this._isLoggedIn$.next(false);
    }
  }

  signOut(): void {
    removeItem(StorageItem.Key);
    removeItem(StorageItem.CreatorStats);

    setItem(StorageItem.Role, ROLE_TYPE_UTILS.noUser);
    setItem(StorageItem.User, null);
    setItem(StorageItem.LoggedInUser, null);
    setItem(StorageItem.JwtToken, null);
    setItem(StorageItem.LastRole, null);

    this._isLoggedIn$.next(false);
    this._user$.next(null);
    this._loggedInUser$.next(null);
    this._role$.next(ROLE_TYPE_UTILS.noUser);
  }
}
