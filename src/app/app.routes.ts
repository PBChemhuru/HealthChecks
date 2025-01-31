import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './auth.guard';
import { PatientslistComponent } from './components/Patient/patientslist/patientslist.component';
import { PatientformComponent } from './components/Patient/patientform/patientform.component';
import { PatientdetailsComponent } from './components/Patient/patientdetails/patientdetails.component';
import { RecommendcheckslistComponent } from './components/recommendedchecks/recommendcheckslist/recommendcheckslist.component';


export const routes: Routes = [
    { path: '', pathMatch: 'full', component: LoginComponent }, 
    { path: 'home', component: HomeComponent,canActivate: [authGuard] },
    { path: 'add-patient', component: PatientformComponent,canActivate: [authGuard] },
    { path: 'patient-list', component: PatientslistComponent,canActivate: [authGuard] },
    { path: 'patient-details/:id', component: PatientdetailsComponent,canActivate: [authGuard] },
    { path: 'recommendedCheck-list', component: RecommendcheckslistComponent,canActivate: [authGuard] },
    
  


];
