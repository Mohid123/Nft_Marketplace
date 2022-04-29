import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  // currentUser$ = authState(this.auth);
  constructor(  public afAuth: AngularFireAuth, private toastr: ToastrService ) {  }

// login(username: string, password: string) {
//     return from(signInWithEmailAndPassword(this.auth, username, password))
//   }

//   logout() {
//     return from(this.afAuth.signOut());
//   }

  // signUp(name: string, email: string, password: string) {
  //   return from(createUserWithEmailAndPassword(this.auth, email, password))
  //   .pipe(switchMap(({ user }) => updateProfile(user, { displayName: name})))
  // }

   signup(fullname: string, email: string, password: string) {
     debugger
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value )=> {
        debugger
        value.user.updateProfile({
          displayName: fullname
        })
        // this.toastr.success('User created', 'Success!')

      })
      .catch(err => {
        this.toastr.error(err.message, 'Something went wrong' )
        // return
      });
  }

}
