import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RecommendedChecks } from '../model/RecommendedChecks';

@Injectable({
  providedIn: 'root',
})
export class RecommendedchecksService {
  private apiUrl = 'https://localhost:7057';
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Attach JWT token
    });
  }

  getRecommendedChecks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get_recommendedCheckslist`, {
      headers: this.getAuthHeaders(),
    });
  }

  createRecommendedChecks(recommendedchecks:RecommendedChecks): Observable<any>
  {
    return this.http.post<any>(`${this.apiUrl}/recommendedChecks/create`, recommendedchecks,{ headers: this.getAuthHeaders() });
  }

  updateRecommendedCheck(CheckId: Number, updatedRecommendedCheck: RecommendedChecks): Observable<any> {
    const url = `${this.apiUrl}/recommendedChecks/update/${CheckId}`;
    return this.http
      .put(url, updatedRecommendedCheck, { headers: this.getAuthHeaders() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An error occurred while updating the RecommendedCheck.';
          if (error.status === 401) {
            errorMessage =
              'Unauthorized: You do not have permission to update this RecommendedCheck.';
          } else if (error.status === 400) {
            errorMessage = 'Bad request: Invalid data provided.';
          }
          console.error('Error updating RecommendedCheck:', errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  deleteRecommendedCheck(CheckId: Number): Observable<any> {
    const url = `${this.apiUrl}/recommendedChecks/${CheckId}`;
    return this.http.delete(url, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('RecommendedCheck not found'));
        } else if (error.status === 401) {
          return throwError(
            () =>
              new Error(
                'Unauthorized: You do not have permission to delete RecommendedCheck.'
              )
          );
        } else {
          return throwError(
            () => new Error('An error occurred while deleting the RecommendedCheck.')
          );
        }
      })
    );
  }
}
