import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoComponent } from "../logo/logo.component";
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-navbar',
  imports: [LogoComponent,],
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAdminOrDoctor: boolean = false;
  isPatient: boolean = false;

  constructor(private router: Router) {
    // Retrieve the user role from localStorage or service
    const userRole = localStorage.getItem('userRole'); // 'admin', 'doctor', 'patient'

    // Check role and set appropriate flags
    if (userRole === 'Admin' || userRole === 'doctor') {
      this.isAdminOrDoctor = true;
    } else if (userRole === 'patient') {
      this.isPatient = true;
    }
  }

  // Function to navigate to home page when logo is clicked
  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
