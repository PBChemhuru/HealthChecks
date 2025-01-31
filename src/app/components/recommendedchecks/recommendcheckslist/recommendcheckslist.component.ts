import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SearchComponent } from '../../search/search.component';
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
import { AddEditRecommendedCheckDialogComponent } from '../add-edit-recommended-check-dialog/add-edit-recommended-check-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommendcheckslist',
  standalone: true,
  imports: [
    NavbarComponent,
    SearchComponent,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCardModule,
    RecommendcheckslistItemsComponent,
    MatListModule,
    CommonModule,
  ],
  templateUrl: './recommendcheckslist.component.html',
  styleUrl: './recommendcheckslist.component.css',
})
export class RecommendcheckslistComponent implements OnInit {
  recommendedChecks: any[] = [];

  constructor(
    private recommendedcheckService: RecommendedchecksService,
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getRecommendedChecks();
  }
  getRecommendedChecks() {
    this.recommendedcheckService.getRecommendedChecks().subscribe({
      next: (data) => {
        this.recommendedChecks = data;
      },
      error: (error) => {
        this.snackBar.open('Failed to load recommended checks', 'Close', {
          duration: 3000,
        });
        console.error('Error fetching Recommended Checks', error);
      },
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditRecommendedCheckDialogComponent, {
      width: '500px',
      data: { action: 'add', recommendedChecks: {} },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recommendedChecks.push(result);
      }
    });
  }

  openEditDialog(check: any): void {
    const dialogRef = this.dialog.open(AddEditRecommendedCheckDialogComponent, {
      width: '400px',
      data: { action: 'edit', recommendedCheck: check },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recommendedcheckService
          .updateRecommendedCheck(result.id, result)
          .subscribe((updatedCheck) => {
            // Replace the updated check in the list
            const index = this.recommendedChecks.findIndex(
              (c) => c.id === updatedCheck.id
            );
            if (index > -1) {
              this.recommendedChecks[index] = updatedCheck;
            }
          });
      }
    });
  }

  deleteRecommendedCheck(check: any): void {
    this.recommendedcheckService
      .deleteRecommendedCheck(check.id)
      .subscribe(() => {
        this.recommendedChecks = this.recommendedChecks.filter(
          (c) => c.id !== check.id
        );
      });
  }
}
