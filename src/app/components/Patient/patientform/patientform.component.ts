import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../../model/Patient';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patientform',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe],
  templateUrl: './patientform.component.html',
  styleUrls: ['./patientform.component.css'],
})
export class PatientformComponent {
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private datePipe: DatePipe ,private router:Router
  ) {
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required]],
      emergencyContact: ['', [Validators.required]],
      emergencyContactInfo: ['', [Validators.required]],
      heightCM: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      weightKG: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      chronicConditions: [null],
      allergies: [null],
      medications: [null],
      familyHistory: [null],
    });
  }

  submitForm() {
    if (this.patientForm.invalid) {
      return;
    }
  
    const patientData = this.patientForm.value;
  
    // Format the date before submitting
    if (patientData.dob) {
      patientData.dob = this.datePipe.transform(patientData.dob, 'yyyy-MM-dd');
    }
  
    // Check for null or undefined values and assign "N/A" if necessary
    if (!patientData.chronicConditions) {
      patientData.chronicConditions = "N/A";
    }
    if (!patientData.allergies) {
      patientData.allergies = "N/A";
    }
    if (!patientData.medications) {
      patientData.medications = "N/A";
    }
    if (!patientData.familyHistory) {
      patientData.familyHistory = "N/A";
    }
   
    this.patientService.createPatient(patientData).subscribe({
      next: (response) => {
        console.log('Patient added successfully:', response);
        this.router.navigate(['/patient-list']); 
      },
      error: (error) => {
        console.error('Error adding patient:', error);
        alert('An error occurred while adding the patient.');
      },
    });
  }
  
}
