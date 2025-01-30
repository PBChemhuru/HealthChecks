import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './auth.guard';
import { PatientslistComponent } from './components/patientslist/patientslist.component';
import { PatientformComponent } from './components/patientform/patientform.component';


export const routes: Routes = [
    { path: '', pathMatch: 'full', component: LoginComponent }, 
    { path: 'home', component: HomeComponent,canActivate: [authGuard] },
    { path: 'add-patient', component: PatientformComponent,canActivate: [authGuard] },
    { path: 'patient-list', component: PatientslistComponent,canActivate: [authGuard] },


];
