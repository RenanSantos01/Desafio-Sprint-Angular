import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // ✅ novo import

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent }, // ✅ nova rota
  { path: '**', redirectTo: 'login' }
];
