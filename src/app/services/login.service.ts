import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7057';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get_users`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add_users`, user);
  }

  login(username: string, password: string): Observable<any> {
    const loginPayload = {
      username: username,
      password: password
    };
    return this.http.post(`${this.apiUrl}/api/auth/login`, loginPayload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed'));
      }),
      tap(response =>{
        console.log(response);
        sessionStorage.setItem('user', JSON.stringify(response));
      })
    );
  }

  isAuthenticated():boolean {
    const token = sessionStorage.getItem('jwtToken');
    if(!token) return false;
    const tokenExpiration = this.getTokenExpiratonDate(token);
    if(tokenExpiration && tokenExpiration< new Date())
    {
      this.logout();
      return false;
    }

    return true;
  }

  getTokenExpiratonDate(token:string):Date | null {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.expiration) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.expiration);
    return date;
  }

  decodeToken(token:string): any{
    try
    {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    }
    catch (error)
    {
      return null;
    }
  }

  logout(): Observable<any> {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
  
    const logoutPayload = { token: token };
    
    return this.http.post(`${this.apiUrl}/api/auth/logout`, logoutPayload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(error => {
        console.error('Logout error:', error);
        return throwError(() => new Error('Logout failed'));
      }),
      tap(response => {
        console.log('Logout successful:', response);
        sessionStorage.removeItem('jwtToken'); // Remove token from session storage
      })
    );
  }

  isAdmin(): boolean {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) return false;
  
    const decoded = this.decodeToken(token);
  
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    
    return role === 'Admin';
  }
}
