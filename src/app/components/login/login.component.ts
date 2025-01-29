import { Component, OnInit } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { LoginService } from '../../services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LogoComponent,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  users: any[] = [];
  username = '';
  password = '';

  constructor(private loginService: LoginService) {}

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
    this.loginService.login(username, password).subscribe((response) => {
      console.log('Login response:', response);
    });
  }

}
