import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { MedicalInfoComponent } from "./medical-info/medical-info.component";
import { RecommendationComponent } from "./recommendation/recommendation.component";
import { VisitHistoryComponent } from "./visit-history/visit-history.component";
import { Patient } from '../../../model/Patient';
import { PatientService } from '../../../services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-patientdetails',
  standalone:true,
  imports: [NavbarComponent, MedicalInfoComponent, RecommendationComponent, VisitHistoryComponent,CommonModule],
  templateUrl: './patientdetails.component.html',
  styleUrl: './patientdetails.component.css'
})
export class PatientdetailsComponent implements OnInit {
  patient!: Patient;
  patientId!: number;
  activeTab: number = 1;

  constructor(private patientService:PatientService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id')!;

    this.patientService.getPatient(this.patientId).subscribe(
      (data) =>{
        this.patient=data;
      },
      (error)=>{
        console.error('error fetching patient details',error);
      }
    );
    
  }
  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }

}
