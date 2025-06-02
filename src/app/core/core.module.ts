import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ExpertService } from './services/expert.service';
import { VehicleService } from './services/vehicle.service';
import { AppointmentService } from './services/appointment.service';
import { ReportService } from './services/report.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ExpertService,
    VehicleService,
    AppointmentService,
    ReportService
  ]
})
export class CoreModule { } 