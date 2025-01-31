import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../../model/Patient';
import { Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-patientslist-item',
  standalone:true,
  imports:[MatCardModule,MatButtonModule,MatIconModule],
  templateUrl: './patientslist-item.component.html',
  styleUrls: ['./patientslist-item.component.css'],
})
export class PatientslistItemComponent {
  @Input() patient!: Patient;
  @Output() patientDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private router: Router,
    private patientService: PatientService,
    public dialog: MatDialog
  ) {}

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

  /*deletePatient() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        patientName: `${this.patient.firstName} ${this.patient.lastName}`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.patientService.deletePatient(this.patient.patientId).subscribe({
          next: () => {
            alert('Patient deleted successfully');
            this.patientDeleted.emit(this.patient.patientId);
          },
          error: (error) => {
            alert(error.message);
          },
        });
      }
    });
  }*/
}
