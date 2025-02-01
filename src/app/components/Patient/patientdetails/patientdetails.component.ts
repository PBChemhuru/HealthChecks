import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../../model/Patient';
import { PatientService } from '../../../services/patient.service';
import { EditPatientModalComponent } from './edit-patient-modal/edit-patient-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatOptionModule,
    MatTabsModule,
  ],
  templateUrl: './patientdetails.component.html',
  styleUrls: ['./patientdetails.component.css'],
})
export class PatientdetailsComponent implements OnInit {
  patientId!: number;
  patientDetails!: Patient;
  recommendedChecks: any[] = []; // List to store recommended checks
  selectedCheckStatus: string = 'pending'; // To filter checks by status

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Fetch patient ID from route
    this.route.params.subscribe((params) => {
      console.log(params)
      this.patientId = +params['id'];
      console.log(this.patientId)
      this.getPatientDetails(this.patientId);
    });
  }

  // Get the patient details
  getPatientDetails(id:number): void {
    
    this.patientService
      .getPatient(id)
      .subscribe((data: Patient) => {
        this.patientDetails = data;
        console.log(this.patientDetails);
      });
  }
  // Open dialog to edit patient details
  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditPatientModalComponent, {
      data: { patient: this.patientDetails },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPatientDetails(result); // Refresh patient details after edit
      }
    });
  }

  // Delete the patient
  deletePatient(): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(this.patientId).subscribe(() => {
        alert('Patient deleted successfully!');
        this.router.navigate(['/patients']); // Redirect to patients list after deletion
      });
    }
  }
}
