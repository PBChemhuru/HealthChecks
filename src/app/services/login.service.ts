import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.http.post(`${this.apiUrl}/login`, loginPayload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }
}
