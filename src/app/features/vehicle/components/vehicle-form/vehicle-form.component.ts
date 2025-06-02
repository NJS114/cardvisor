import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-vehicle-form',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Ajouter un Véhicule</h1>
        
        <form [formGroup]="vehicleForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Marque -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Marque</label>
            <input type="text" formControlName="brand"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>

          <!-- Modèle -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Modèle</label>
            <input type="text" formControlName="model"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>

          <!-- Année -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Année</label>
            <input type="number" formControlName="year"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>

          <!-- Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <select formControlName="type"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="">Sélectionnez un type</option>
              <option value="SEDAN">Berline</option>
              <option value="SUV">SUV</option>
              <option value="HATCHBACK">Citadine</option>
              <option value="COUPE">Coupé</option>
              <option value="CONVERTIBLE">Cabriolet</option>
              <option value="WAGON">Break</option>
              <option value="VAN">Fourgonnette</option>
              <option value="PICKUP">Pick-up</option>
            </select>
          </div>

          <!-- Kilométrage -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Kilométrage</label>
            <input type="number" formControlName="mileage"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>

          <!-- Type de carburant -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Type de carburant</label>
            <select formControlName="fuelType"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="">Sélectionnez un type de carburant</option>
              <option value="PETROL">Essence</option>
              <option value="DIESEL">Diesel</option>
              <option value="ELECTRIC">Électrique</option>
              <option value="HYBRID">Hybride</option>
              <option value="LPG">GPL</option>
            </select>
          </div>

          <!-- Numéro de série -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Numéro de série (VIN)</label>
            <input type="text" formControlName="vin"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>

          <!-- Boutons -->
          <div class="flex justify-end space-x-4">
            <button type="button" (click)="onCancel()"
                    class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button type="submit" [disabled]="!vehicleForm.valid"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
              Ajouter le véhicule
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class VehicleFormComponent implements OnInit {
  vehicleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
    private authService: AuthService
  ) {
    this.vehicleForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      type: ['', Validators.required],
      mileage: ['', [Validators.required, Validators.min(0)]],
      fuelType: ['', Validators.required],
      vin: ['', [Validators.required, Validators.pattern('^[A-HJ-NPR-Z0-9]{17}$')]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const formData = {
        userId: this.authService.getToken() || '',
        brand: this.vehicleForm.get('brand')?.value,
        model: this.vehicleForm.get('model')?.value,
        year: this.vehicleForm.get('year')?.value,
        vin: this.vehicleForm.get('vin')?.value,
        fuelType: this.vehicleForm.get('fuelType')?.value,
        gearbox: this.vehicleForm.get('gearbox')?.value,
        mileage: this.vehicleForm.get('mileage')?.value
      };

      this.vehicleService.createVehicle(formData).subscribe({
        next: () => {
          this.router.navigate(['/vehicles']);
        },
        error: (error) => {
          console.error('Error creating vehicle:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/vehicles']);
  }
} 