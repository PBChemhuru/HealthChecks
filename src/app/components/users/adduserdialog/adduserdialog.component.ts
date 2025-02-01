import { Component } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { RecommendedchecksService } from '../../../services/recommendedchecks.service';
import { HttpClient } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-adduserdialog',
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
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './adduserdialog.component.html',
  styleUrl: './adduserdialog.component.css',
})
export class AdduserdialogComponent {
  form: FormGroup;
  isPatientSelected = false;
  hidePassword = true;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdduserdialogComponent>
  ) {
    this.form = this.fb.group({
      firstname:['',Validators.required],
      surname:['',Validators.required],
      email:['',Validators.required],
      role: ['',Validators.required],
      password_hash: ['',Validators.required],
      patientId: [''],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onRoleChange(role: string): void {
    this.isPatientSelected = role === 'Patient';
    if (!this.isPatientSelected) {
      this.form.get('patientId')?.setValue('');
    }
  }
}
