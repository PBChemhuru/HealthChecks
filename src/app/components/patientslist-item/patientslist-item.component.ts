import { Component, Input } from '@angular/core';
import { Patient } from '../../model/Patient';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';


@Component({
  selector: 'app-patientslist-item',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './patientslist-item.component.html',
  styleUrl: './patientslist-item.component.css',
})
export class PatientslistItemComponent {
  @Input() patient!: Patient;


  constructor(private router:Router,private patientService:PatientService){}
  
  calculateAge(dateOfBirth: Date): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    // If the birthday hasn't occurred yet this year, subtract 1
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }

    return age;
  }


  viewPatientDetails(patientId: number) {
    this.router.navigate([`/patient-details/${patientId}`]);
  }

  deletePatient(patient: Patient) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(patient).subscribe(() => {
        alert('Patient deleted successfully!');
      });
    }
  }

}
