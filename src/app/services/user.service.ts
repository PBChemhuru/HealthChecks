import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Users } from '../model/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 private apiUrl = 'https://localhost:7057';
   constructor(private http: HttpClient) {}
 
   private getAuthHeaders(): HttpHeaders {
     const token = sessionStorage.getItem('jwtToken');
     return new HttpHeaders({
       'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`, // Attach JWT token
     });
   }
 
   getUsers(): Observable<any> {
     return this.http.get(`${this.apiUrl}/get_users`, {
       headers: this.getAuthHeaders(),
     });
   }
 
   createUser(users:Users): Observable<any>
   {
     return this.http.post<any>(`${this.apiUrl}/user/create`, users,{ headers: this.getAuthHeaders() });
   }
 
   updateUser(id: Number, updateduser: Users): Observable<any> {
     const url = `${this.apiUrl}/user/update/${id}`;
     return this.http
       .put(url, updateduser, { headers: this.getAuthHeaders() })
       .pipe(
         catchError((error: HttpErrorResponse) => {
           let errorMessage = 'An error occurred while updating the User.';
           if (error.status === 401) {
             errorMessage =
               'Unauthorized: You do not have permission to update this User.';
           } else if (error.status === 400) {
             errorMessage = 'Bad request: Invalid data provided.';
           }
           console.error('Error updating User:', errorMessage);
           return throwError(() => new Error(errorMessage));
         })
       );
   }
 
   deleteUser(id: Number): Observable<any> {
     const url = `${this.apiUrl}/user/${id}`;
     return this.http.delete(url, { headers: this.getAuthHeaders() }).pipe(
       catchError((error: HttpErrorResponse) => {
         if (error.status === 404) {
           return throwError(() => new Error('User not found'));
         } else if (error.status === 401) {
           return throwError(
             () =>
               new Error(
                 'Unauthorized: You do not have permission to delete User.'
               )
           );
         } else {
           return throwError(
             () => new Error('An error occurred while deleting the User.')
           );
         }
       })
     );
   }
}
