import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { ListAppointmentsPageComponent } from './pages/list-appointments-page/list-appointments-page.component';
import { CreateAppointmentPageComponent } from './pages/create-appointment-page/create-appointment-page.component';
import { AppointmentsPageComponent } from './pages/appointments-page/appointments-page.component';

const routes: Routes = [
  {
    path: '',
    component: ListAppointmentsPageComponent
  },
  {
    path: 'create',
    component: CreateAppointmentPageComponent
  }
];

@NgModule({
  declarations: [
    ListAppointmentsPageComponent,
    CreateAppointmentPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    AppointmentsPageComponent
  ]
})
export class AppointmentsModule { } 