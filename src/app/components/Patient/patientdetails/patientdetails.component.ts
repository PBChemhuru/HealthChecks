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
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PatientchecksService } from '../../../services/patientchecks.service';
import { PatientRecommendation } from '../../../model/PatientRecommendation';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { AddpatientrecommendedcheckdialogComponent } from './addpatientrecommendedcheckdialog/addpatientrecommendedcheckdialog.component';

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
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './patientdetails.component.html',
  styleUrls: ['./patientdetails.component.css'],
})
export class PatientdetailsComponent implements OnInit {
  patientId!: number;
  patientDetails!: Patient;
  recommendedChecks: any[] = [];
  selectedCheckStatus: string = 'pending';
  patientsChecks: any[] = [];
  filteredChecks: any[] = [];
  checklistForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private dialog: MatDialog,
    private patientCheckService: PatientchecksService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.checklistForm = this.fb.group({
      checks: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.patientId = +params['id'];
      this.getPatientDetails(this.patientId);
      this.getPatientchecks(this.patientId);
    });

  }

  get checks(): FormArray<FormControl> {
    return this.checklistForm.get('checks') as FormArray<FormControl>;
  }

  getPatientchecks(id: number): void {
    this.patientCheckService.getpatientsChecks(id).subscribe((data) => {
      this.patientsChecks = data;
      this.filterChecks();
    });
  }
  filterChecks(): void {
    if (this.selectedCheckStatus === 'pending') {
      this.filteredChecks = this.patientsChecks.filter((check) => !check.completed);
    } else if (this.selectedCheckStatus === 'finished') {
      this.filteredChecks = this.patientsChecks.filter((check) => check.completed);
    } else {
      this.filteredChecks = this.patientsChecks;
    }
  
 
    this.checks.clear();
  
  
    this.filteredChecks.forEach((check) => {
      this.checks.push(this.fb.control(check.completed));  
    });
  }

  populateChecks(): void {
    console.log(this.patientsChecks);
    this.checks.clear();
    this.patientsChecks.forEach((check) => {
      this.checks.push(this.fb.control(check.completed));
    });
  }
  onStatusChange(status: string): void {
    this.selectedCheckStatus = status;
    this.filterChecks();
  }

  submitChecklist(): void {
    console.log(this.checklistForm.value);
    const updatedChecks = this.filteredChecks.map((check, index) => ({
      ...check,
      completed: this.checklistForm.value.checks[index],  
    }));

    this.patientCheckService.updateCheckStatuses(updatedChecks).subscribe({
      next: (response) => {
        console.log('Checklist updated:', response);
        console.log(updatedChecks);
        this.snackbar.open('Checklist updated', 'Close', {
          duration: 3000,
        });
        this.getPatientchecks(this.patientId);
      },
      error: (error) => {
        console.error('Error updating checklist:', error);
        this.snackbar.open('Error updating checklist:' + error, 'Close', {
          duration: 3000,
        });
      },
    });
  }

  getPatientDetails(id: number): void {
    this.patientService.getPatient(id).subscribe((data: Patient) => {
      this.patientDetails = data;
      console.log(this.patientDetails);
    });
  }

  openEditDialog(patientinfo: any): void {
    const dialogRef = this.dialog.open(EditPatientModalComponent, {
      data: patientinfo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPatientDetails(result.patientId);
      }
    });
  }

  deletePatient(): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(this.patientId).subscribe(() => {
        alert('Patient deleted successfully!');
        this.router.navigate(['/patients']);
      });
    }
  }

  OpenAddDialog(patientinfo: any): void {
   
    const dialogRef = this.dialog.open(AddpatientrecommendedcheckdialogComponent,{
      width:"500px",
      data: patientinfo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result)
      {
        this.getPatientchecks(result.patientId);
      }
    });
  }

  addpatientcheck(dwad: any){}
  
}
