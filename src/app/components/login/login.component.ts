import { Component, OnInit } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { LoginService } from '../../services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LogoComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  users: any[] = [];
  username = '';
  password = '';
  message = '';

  constructor(private loginService: LoginService,private router:Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.loginService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

 

  login() {
    const { username, password } = this;
    this.loginService.login(username, password).subscribe({
      next: (response) => {
        if (response && response.token) {
          sessionStorage.setItem('jwtToken', response.token);
          this.message = 'Login successful!';
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        this.message = 'Login failed: ' + error.message;
      }
    });
  }
}
