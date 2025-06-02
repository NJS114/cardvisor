import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExpertCardComponent } from './components/expert-card/expert-card.component';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';
import { ReportCardComponent } from './components/report-card/report-card.component';
import { AddressAutocompleteComponent } from './components/address-autocomplete/address-autocomplete.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ExpertCardComponent,
    VehicleCardComponent,
    ReportCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AddressAutocompleteComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    ExpertCardComponent,
    VehicleCardComponent,
    ReportCardComponent,
    AddressAutocompleteComponent
  ]
})
export class SharedModule { } 