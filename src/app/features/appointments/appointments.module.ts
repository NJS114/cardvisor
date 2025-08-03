import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ListAppointmentsPageComponent } from './pages/list-appointments-page/list-appointments-page.component';
import { CreateAppointmentPageComponent } from './pages/create-appointment-page/create-appointment-page.component';
import { AppointmentsPageComponent } from './pages/appointments-page/appointments-page.component';
import { AppointmentService } from '../../core/services/appointment.service';
import { AppointmentDetailComponent } from '../appointment/components/appointment-detail/appointment-detail.component';

const routes: Routes = [
  { path: '', component: ListAppointmentsPageComponent },
  { path: 'create', component: CreateAppointmentPageComponent },
  { path: 'manage', component: AppointmentsPageComponent },
  { path: ':id', loadComponent: () => import('../appointment/components/appointment-detail/appointment-detail.component').then(m => m.AppointmentDetailComponent) }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ListAppointmentsPageComponent,
    AppointmentsPageComponent
  ],
  declarations: [
    CreateAppointmentPageComponent
  ],
  providers: [
    AppointmentService
  ]
})
export class AppointmentsModule { } 