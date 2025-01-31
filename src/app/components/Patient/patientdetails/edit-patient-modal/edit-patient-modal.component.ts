import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../../../model/Patient';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../../../services/patient.service';

@Component({
  selector: 'app-edit-patient-modal',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './edit-patient-modal.component.html',
  styleUrl: './edit-patient-modal.component.css',
})
export class EditPatientModalComponent {
  patient: Patient;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<EditPatientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient,
    private patientService: PatientService
  ) {
    this.patient = { ...data };
  }

  submitChanges() {
    if (this.patient) {
      this.isLoading = true;
      if (!this.patient.chronicConditions) {
        this.patient.chronicConditions = "N/A";
      }
      if (!this.patient.allergies) {
        this.patient.allergies = "N/A";
      }
      if (!this.patient.medications) {
        this.patient.medications = "N/A";
      }
      if (!this.patient.familyHistory) {
        this.patient.familyHistory = "N/A";
      }
      this.patientService
        .updatePatient(this.patient.patientId, this.patient)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            console.log('Patient updated successfully:', response);
            this.dialogRef.close(this.patient);
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = 'An error occurred while updating patient data';
            console.error('Error updating patient:', error);
            alert('An error occurred while updating the patient information.');
          },
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
