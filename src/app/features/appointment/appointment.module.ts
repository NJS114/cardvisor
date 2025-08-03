import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AppointmentDetailComponent } from './components/appointment-detail/appointment-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppointmentFormComponent,
    AppointmentListComponent,
    AppointmentDetailComponent
  ],
  exports: [
    AppointmentFormComponent,
    AppointmentListComponent,
    AppointmentDetailComponent
  ]
})
export class AppointmentModule { } 