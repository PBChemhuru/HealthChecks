import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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
import { RecommendcheckslistItemsComponent } from '../recommendcheckslist-items/recommendcheckslist-items.component';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-add-edit-recommended-check-dialog',
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
    ReactiveFormsModule,
  ],
  templateUrl: './add-edit-recommended-check-dialog.component.html',
  styleUrl: './add-edit-recommended-check-dialog.component.css',
})
export class AddEditRecommendedCheckDialogComponent {
  recommendedCheckForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditRecommendedCheckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.recommendedCheckForm = this.fb.group({
      CheckName: [data.recommendedCheck.name || '', Validators.required],
      description: [
        data.recommendedCheck.description || '',
        Validators.required,
      ],
    });
  }

  onSave(): void {
    if (this.recommendedCheckForm.valid) {
      this.dialogRef.close(this.recommendedCheckForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
