import { Component, OnInit,ViewChild } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { PatientslistItemComponent } from '../patientslist-item/patientslist-item.component';
import { PatientService } from '../../../services/patient.service';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../search/search.component';
import { Patient } from '../../../model/Patient';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { PatientformComponent } from '../patientform/patientform.component';
import { PatientdetailsComponent } from '../patientdetails/patientdetails.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patientslist',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './patientslist.component.html',
  styleUrl: './patientslist.component.css',
})
export class PatientslistComponent implements OnInit {
  patients = new MatTableDataSource<any>([])
  displayedColumns :string[] = [
    'patientId',
    'firstName',
    'lastName',
    'age',
    'gender',
    'actions'
  ];
  searchKey: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private patientService: PatientService, private dialog: MatDialog,private snackBar: MatSnackBar,private router:Router) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  ngAfterViewInit(): void {

    console.log(this.displayedColumns);
    this.patients.paginator = this.paginator;
  }

  loadPatients() {
    this.patientService.getPatients().subscribe({
      next: (patient) => {
        this.patients.data = patient.map((p: any) => ({
          ...p,
          age: this.calculateAge(p.dob),
        }));
      },
      error:(error)=>{
        this.snackBar.open('Failed to load Patietns', 'Close', {
          duration: 3000,
        });
        console.error('error getting user', error);
      }
    });
  }

  applySearchFilter(event: Event):void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchKey = filterValue.trim().toLowerCase();
    this.patients.filter = this.searchKey;
  }

  viewPatientDetails(patientId: string): void {
    this.router.navigate([`/patient-details/${patientId}`]);
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
