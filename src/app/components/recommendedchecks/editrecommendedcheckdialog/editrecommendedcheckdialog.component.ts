import {Component,Inject,OnInit,ViewChild,AfterViewInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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

@Component({
  selector: 'app-editrecommendedcheckdialog',
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
    MatSortModule,FormsModule,ReactiveFormsModule
  ],
  templateUrl: './editrecommendedcheckdialog.component.html',
  styleUrl: './editrecommendedcheckdialog.component.css',
})
export class EditrecommendedcheckdialogComponent {
  form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<EditrecommendedcheckdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      checkId: [this.data.checkId, Validators.required],
      checkName: [this.data.checkName, Validators.required],
      description: [this.data.description, Validators.required],
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
}
