import { Component, OnInit, ViewChild } from '@angular/core';
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
import { EditrecommendedcheckdialogComponent } from '../editrecommendedcheckdialog/editrecommendedcheckdialog.component';
import { RecommendedChecks } from '../../../model/RecommendedChecks';
import { AddrecommendedcheckdialogComponent } from '../addrecommendedcheckdialog/addrecommendedcheckdialog.component';
import { DelelterecommendedcheckdialogComponent } from '../delelterecommendedcheckdialog/delelterecommendedcheckdialog.component';

@Component({
  selector: 'app-recommendcheckslist',
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
  ],
  templateUrl: './recommendcheckslist.component.html',
  styleUrl: './recommendcheckslist.component.css',
})
export class RecommendcheckslistComponent implements OnInit {
  displayColumns: string[] = ['checkId', 'checkName', 'description', 'actions'];
  recommendedChecks = new MatTableDataSource<any>([]);
  searchKey: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private recommendedcheckService: RecommendedchecksService,
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getRecommendedChecks();
  }

  ngAfterViewInit(): void {
    this.recommendedChecks.paginator = this.paginator;
  }

  getRecommendedChecks() {
    this.recommendedcheckService.getRecommendedChecks().subscribe({
      next: (data) => {
        this.recommendedChecks.data = data;
        console.log(this.recommendedChecks);
        this.recommendedChecks.paginator = this.paginator;
        
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
    const dialogRef = this.dialog.open(AddrecommendedcheckdialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createCheck(result);
      }
    });
  }
  createCheck(newRecommendedCheck: RecommendedChecks): void {
    this.recommendedcheckService
      .createRecommendedChecks(newRecommendedCheck)
      .subscribe({
        next: (response) => {
          this.getRecommendedChecks();
          this.snackBar.open('Check Created', 'Close', {
            duration: 3000,
          });
          console.log('Check created successfully', response);
        },
        error: (error) => {
          console.error('Check creation failed', error);
        },
      });
  }

  openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(EditrecommendedcheckdialogComponent, {
      width: '500px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateCheck(result);
      }
    });
  }
  updateCheck(updatedRecommendedCheck: RecommendedChecks): void {
    console.log(updatedRecommendedCheck.checkId);
    this.recommendedcheckService
      .updateRecommendedCheck(
        updatedRecommendedCheck.checkId,
        updatedRecommendedCheck
      )
      .subscribe({
        next: (response) => {
          this.getRecommendedChecks();
          console.log('check updated successfully:', response);
        },
        error: (error) => {
          console.error('Error Updating Check', error);
        },
      });
  }

  openDeleteDialog(item: any): void {
    const dialogRef = this.dialog.open(DelelterecommendedcheckdialogComponent, {
      width: '500px',
      data: item,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteRecommendedCheck(item.checkId);
      }
    });
  }
  deleteRecommendedCheck(check: any): void {
    this.recommendedcheckService.deleteRecommendedCheck(check).subscribe({
      next: (response) => {
        this.getRecommendedChecks();
        console.log('check deleted successfully:', response);
      },
      error: (error) => {
        console.error('Error Deleting Check', error);
      },
    });
  }

  applySearchFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchKey = filterValue.trim().toLowerCase();
    this.recommendedChecks.filter = this.searchKey;
  }
}
