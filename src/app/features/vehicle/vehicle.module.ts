import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';

@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleFormComponent,
    VehicleDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    VehicleListComponent,
    VehicleFormComponent,
    VehicleDetailComponent
  ]
})
export class VehicleModule { } 