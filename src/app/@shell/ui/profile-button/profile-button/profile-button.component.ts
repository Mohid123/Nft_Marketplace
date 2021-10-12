import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/services/auth.service';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }

  signOut():void {
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}
