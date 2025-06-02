import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/pages/home/home.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Accueil - CarAdvisors'
  },
  { 
    path: 'auth/login', 
    component: LoginPageComponent,
    title: 'Connexion - CarAdvisors'
  },
  { 
    path: 'auth/register', 
    component: RegisterPageComponent,
    title: 'Inscription - CarAdvisors'
  },
  { 
    path: 'appointments',
    loadChildren: () => import('./features/appointments/appointments.module').then(m => m.AppointmentsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: () => import('./features/reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'experts',
    loadChildren: () => import('./features/experts/experts.module').then(m => m.ExpertsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'vehicles', 
    loadChildren: () => import('./features/vehicles/vehicles.module').then(m => m.VehiclesModule) 
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export { routes }; 