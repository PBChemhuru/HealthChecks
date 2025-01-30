import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Patient } from '../model/Patient';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'https://localhost:7057';
  constructor(private http: HttpClient) {}

  getPatients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get_patients`);
  }

  deletePatient(patient: Patient): Observable<Patient> {
    const url = `${this.apiUrl}/patient-details/${patient.patientId}`;
    return this.http.delete<Patient>(url);
  }
}

