import { Component, Input } from '@angular/core';
import { Patient } from '../../../../model/Patient';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { FormsModule } from '@angular/forms';
import { EditPatientModalComponent } from '../edit-patient-modal/edit-patient-modal.component';


@Component({
  selector: 'app-medical-info',
  imports: [CommonModule,MatButtonModule,MatDialogModule,MatFormFieldModule,MatInputModule,FormsModule],
  standalone:true,
  templateUrl: './medical-info.component.html',
  styleUrl: './medical-info.component.css'
})
export class MedicalInfoComponent {
@Input() patient!:Patient;

constructor(private patientinfodialog: MatDialog){}
openModal()
{
  console.log(this.patient);
  const dialogRef = this.patientinfodialog.open(EditPatientModalComponent,{
    width:"500px",
    data:this.patient,
  });

  dialogRef.afterClosed().subscribe((updatedPatient: Patient) => {
    if (updatedPatient) {
      this.patient = updatedPatient; 
    }
  });
}



}
