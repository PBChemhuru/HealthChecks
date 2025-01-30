import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, LoginComponent, NavbarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private loginService:LoginService){}
  title = 'HealthChecks';
  isAuthenticated(): boolean {
    return this.loginService.isAuthenticated();
  }
}
