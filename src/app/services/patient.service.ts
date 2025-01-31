import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Patient } from '../model/Patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'https://localhost:7057';
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Attach JWT token
    });
  }

  getPatients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get_patients`, {
      headers: this.getAuthHeaders(),
    });
  }

  createPatient(patient:Patient): Observable<any>
  {
    return this.http.post<any>(`${this.apiUrl}/add-patient/create`, patient,{ headers: this.getAuthHeaders() });
  }
  getPatient(patientId: Number): Observable<any> {
    const url = `${this.apiUrl}/patient-details/${patientId}`;
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

  updatePatient(patientId: Number, updatedPatient: Patient): Observable<any> {
    const url = `${this.apiUrl}/patient-details/update/${patientId}`;
    return this.http
      .put(url, updatedPatient, { headers: this.getAuthHeaders() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An error occurred while updating the patient.';
          if (error.status === 401) {
            errorMessage =
              'Unauthorized: You do not have permission to update this patient.';
          } else if (error.status === 400) {
            errorMessage = 'Bad request: Invalid data provided.';
          }
          console.error('Error updating patient:', errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  deletePatient(patientId: Number): Observable<any> {
    const url = `${this.apiUrl}/delete_patient/${patientId}`;
    return this.http.delete(url, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('Patient not found'));
        } else if (error.status === 401) {
          return throwError(
            () =>
              new Error(
                'Unauthorized: You do not have permission to delete patients.'
              )
          );
        } else {
          return throwError(
            () => new Error('An error occurred while deleting the patient.')
          );
        }
      })
    );
  }
}
