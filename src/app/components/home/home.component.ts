import { Component, OnInit,HostListener  } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { PatientchecksService } from '../../services/patientchecks.service';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../model/Patient';
import { PatientRecommendation } from '../../model/PatientRecommendation';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-home',
  standalone:true,
  imports: [NavbarComponent, MatCardModule,
    MatGridListModule,
    MatIconModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  totalPatients = 0;
  newPatientsToday = 0;
  totalChecksToday = 0;
  completedChecksToday = 0;
  isSmallScreen: boolean = false;
  constructor(private patientCheckService : PatientchecksService,private patientService: PatientService){}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    const today = new Date().setHours(0, 0, 0, 0); 

    this.patientService.getPatients().subscribe((patients: Patient[]) => {
      this.totalPatients = patients.length;

      this.newPatientsToday = patients.filter((p: Patient) => 
        new Date(p.createdAt).setHours(0, 0, 0, 0) === today
      ).length;
    });

    this.patientCheckService.getallpatientchecks().subscribe((checks: PatientRecommendation[]) => {
      this.totalChecksToday = checks.filter((c: PatientRecommendation) => 
        new Date(c.createdAt).setHours(0, 0, 0, 0) === today
      ).length;

      this.completedChecksToday = checks.filter((c: PatientRecommendation) => 
        c.completed && new Date(c.updatedAt).setHours(0, 0, 0, 0) === today
      ).length;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768; 
  }
}
