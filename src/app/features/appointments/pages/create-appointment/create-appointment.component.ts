import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppointmentService, CreateAppointmentData } from '../../../../core/services/appointment.service';
import { AddressAutocompleteComponent } from '../../../../shared/components/address-autocomplete/address-autocomplete.component';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AddressAutocompleteComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Créer un Rendez-vous</h1>

        <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Date et Heure -->
          <div>
            <label for="date" class="block text-sm font-medium text-gray-700 mb-1">
              Date et Heure du Rendez-vous
            </label>
            <input
              type="datetime-local"
              id="date"
              formControlName="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              [min]="minDate"
            >
            <div *ngIf="appointmentForm.get('date')?.touched && appointmentForm.get('date')?.errors" class="mt-1 text-sm text-red-600">
              <span *ngIf="appointmentForm.get('date')?.errors?.['required']">La date est requise</span>
              <span *ngIf="appointmentForm.get('date')?.errors?.['min']">La date doit être dans le futur</span>
            </div>
          </div>

          <!-- Adresse -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Adresse du Rendez-vous
            </label>
            <app-address-autocomplete
              (addressSelected)="onAddressSelected($event)"
            ></app-address-autocomplete>
            <div *ngIf="appointmentForm.get('address')?.touched && appointmentForm.get('address')?.errors" class="mt-1 text-sm text-red-600">
              <span *ngIf="appointmentForm.get('address')?.errors?.['required']">L'adresse est requise</span>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">
              Notes (optionnel)
            </label>
            <textarea
              id="notes"
              formControlName="notes"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ajoutez des détails supplémentaires sur le rendez-vous..."
            ></textarea>
          </div>

          <!-- Bouton de soumission -->
          <div class="flex justify-end">
            <button
              type="submit"
              [disabled]="appointmentForm.invalid"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Créer le Rendez-vous
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
    }
  `]
})
export class CreateAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
    // Définir la date minimale (maintenant)
    const now = new Date();
    this.minDate = now.toISOString().slice(0, 16);
  }

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      date: ['', [Validators.required, this.minDateValidator()]],
      address: ['', Validators.required],
      notes: ['']
    });
  }

  minDateValidator() {
    return (control: any) => {
      const selectedDate = new Date(control.value);
      const now = new Date();
      return selectedDate > now ? null : { min: true };
    };
  }

  onAddressSelected(address: any) {
    this.appointmentForm.patchValue({
      address: address.fullAddress
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const formData: CreateAppointmentData = {
        ...this.appointmentForm.value,
        status: 'EN_ATTENTE'
      };

      this.appointmentService.createAppointment(formData).subscribe({
        next: (response) => {
          console.log('Rendez-vous créé avec succès:', response);
          this.router.navigate(['/appointments']);
        },
        error: (error: any) => {
          console.error('Erreur lors de la création du rendez-vous:', error);
        }
      });
    }
  }
} 