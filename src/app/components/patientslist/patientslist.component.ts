import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PatientslistItemComponent } from '../patientslist-item/patientslist-item.component';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { Patient } from '../../model/Patient';

@Component({
  selector: 'app-patientslist',
  standalone: true,
  imports: [
    NavbarComponent,
    PatientslistItemComponent,
    CommonModule,
    SearchComponent,
  ],
  templateUrl: './patientslist.component.html',
  styleUrl: './patientslist.component.css',
})
export class PatientslistComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  searchTerm: string = '';
  pageSizeOptions: number[] = [10, 25, 50, 100, 200, 500];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe((patients) => {
      this.patients = patients;
      this.filteredPatients = patients;
      this.totalPages = Math.ceil(this.filteredPatients.length / this.pageSize);
    });
  }

  getPaginatedPatients() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;
    return this.filteredPatients.slice(startIndex, endIndex);
  }

  onPageSizeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; 
    if (selectElement) {
      this.pageSize = +selectElement.value; 
      this.totalPages = Math.ceil(this.filteredPatients.length / this.pageSize);
      this.currentPage = 1; 
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;

    if (!searchTerm) {
      this.filteredPatients = this.patients;
      this.filteredPatients = this.patients.filter(
        (patient) =>
          patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.patientId.toString().includes(searchTerm)
      );
    }
    this.totalPages = Math.ceil(this.filteredPatients.length / this.pageSize);
    this.currentPage = 1;
  }

  trackByPatient(index: number, patient: Patient): number {
    return patient.patientId;
  }
}
