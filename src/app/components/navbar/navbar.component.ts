import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { LoginService } from '../../services/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [LogoComponent,CommonModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isAdmin: boolean = false;
  isPatient: boolean = false;
  userFirstName: string = '';
  userSurname: string = '';
  Role: string = '';

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loadUserFromToken();
    console.log(this.loginService.isAdmin());
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  loadUserFromToken(): void {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = this.loginService.decodeToken(token);
      if (decodedToken) {
        this.userFirstName =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
          ];
        this.userSurname =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
          ];
        this.Role =
          decodedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ];

      }
    }
  }
  

  logout() {
    this.loginService.logout().subscribe({
      next: (response) => {
        console.log('Logged out successfully:', response);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Logout error:', error);
      },
    });
  }
}
