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
import { PatientRecommendation } from '../model/PatientRecommendation';

@Injectable({
  providedIn: 'root',
})
export class PatientchecksService {
  private apiUrl = 'https://localhost:7057';
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Attach JWT token
    });
  }

  getpatientsChecks(id: Number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get_PatientChecks/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createpatientsCheck(newPatientsCheck: PatientRecommendation): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/assignCheck`, newPatientsCheck, {
      headers: this.getAuthHeaders(),
    });
  }

  updateCheckStatuses(updatedChecks: PatientRecommendation[]): Observable<any> {
    const url = `${this.apiUrl}/updateCheckStatuses`;
    return this.http
      .put(url, updatedChecks, { headers: this.getAuthHeaders() })
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

  getPatientByCheck(id: Number): Observable<any> {

    const url = `${this.apiUrl}/get_PatientsByCheck/${id}`;
    return this.http.get(url, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(
            () =>
              new Error(
                'Unauthorized: You do not have permission to view patient.'
              )
          );
        } else {
          return throwError(
            () => new Error('An error occurred while fetching the patient.')
          );
        }
      })
    );
  }
}
