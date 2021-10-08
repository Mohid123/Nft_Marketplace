import { Component } from '@angular/core';
import { AuthService } from '@app/pages/auth/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {

  isLogedIn$ = this.authService.isLoggedIn$;

  constructor(private authService: AuthService) {

  }
}
