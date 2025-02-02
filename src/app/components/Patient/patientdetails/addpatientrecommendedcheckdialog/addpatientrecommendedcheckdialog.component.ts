import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
import { PatientchecksService } from '../../../../services/patientchecks.service';
import { PatientRecommendation } from '../../../../model/PatientRecommendation';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ReactiveFormsModule,
  Validator,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { RecommendedchecksService } from '../../../../services/recommendedchecks.service';

@Component({
  selector: 'app-addpatientrecommendedcheckdialog',
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
  standalone: true,
  templateUrl: './addpatientrecommendedcheckdialog.component.html',
  styleUrl: './addpatientrecommendedcheckdialog.component.css',
})
export class AddpatientrecommendedcheckdialogComponent {
  addCheckForm: FormGroup;
  recommendedChecks: any[] = [];
  selectedCheck: any;
  patientId: string;

  constructor(
    private fb: FormBuilder,
    private recommendationCheckService: RecommendedchecksService,
    private patientcrecommendedCheckService: PatientchecksService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddpatientrecommendedcheckdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.patientId = data;
    this.addCheckForm = this.fb.group({
      checks: this.fb.array([this.createCheck()]),
    });
  }

  ngOnInit() {
    this.getRecommendedChecks();
  }

  getRecommendedChecks() {
    this.recommendationCheckService.getRecommendedChecks().subscribe({
      next: (checks) => {
        this.recommendedChecks = checks;
      },
      error: (err) => {
        console.error('Error fetching recommended checks', err);
      },
    });
  }

  createCheck(): FormGroup {
    return this.fb.group({
      checkId: [null, [Validators.required]], 
    });
  }

  get checks(): FormArray {
    return this.addCheckForm.get('checks') as FormArray;
  }

  addCheck() {
    this.checks.push(this.createCheck());
  }

  removeCheck(index: number) {
    this.checks.removeAt(index);
  }

  submit() {
    if (this.addCheckForm.invalid) {
      return;
    }

    const checksData = this.addCheckForm.value.checks.map((check: any) => ({
      patientId: this.patientId,
      checkId: check.checkId,
      completed: false,
    }));
    this.patientcrecommendedCheckService
      .createpatientsCheck(checksData)
      .subscribe({
        next: () => {
          this.snackBar.open('Check assigned', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Error adding check', err);
        },
      });
  }
}
