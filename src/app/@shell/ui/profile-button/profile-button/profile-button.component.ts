import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouteService } from './../../../../@core/services/route.service';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent {
  public userName: any
  public profile: any
  constructor(
    private authService: AuthService,
    private router: Router,
    private routeService: RouteService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('App/user'))
    this.profile = JSON.parse(localStorage.getItem('App/user'))
  }

  signOut():void {
    this.authService.signOut();
    this.toastr.success(`You've logged out.`, 'Logout!')
    this.router.navigate([this.routeService.clubName]);
  }

}
