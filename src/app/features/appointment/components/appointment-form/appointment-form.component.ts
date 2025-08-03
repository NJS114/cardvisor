import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService, AppointmentStatus } from '../../../../core/services/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Prendre un rendez-vous</h1>

        <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Date -->
          <div>
            <label for="date" class="block text-sm font-medium text-gray-700">Date et heure</label>
            <input type="datetime-local" id="date" formControlName="date"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>

          <!-- Adresse -->
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Adresse</label>
            <input type="text" id="address" formControlName="address"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>

          <!-- Notes -->
          <div>
            <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
            <textarea id="notes" formControlName="notes" rows="3"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
          </div>

          <!-- Durée -->
          <div>
            <label for="durationMinutes" class="block text-sm font-medium text-gray-700">Durée (minutes)</label>
            <input type="number" id="durationMinutes" formControlName="durationMinutes"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>

          <!-- Boutons -->
          <div class="flex justify-end space-x-4">
            <button type="button" (click)="goBack()"
                    class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Annuler
            </button>
            <button type="submit" [disabled]="!appointmentForm.valid"
                    class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50">
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  expertId: string | null = null;
  vehicleId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      address: ['', Validators.required],
      notes: [''],
      durationMinutes: [60, [Validators.required, Validators.min(15)]]
    });
  }

  ngOnInit(): void {
    this.expertId = this.route.snapshot.queryParamMap.get('expertId');
    this.vehicleId = this.route.snapshot.queryParamMap.get('vehicleId');

    if (!this.expertId || !this.vehicleId) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.appointmentForm.valid && this.expertId && this.vehicleId) {
      const appointmentData = {
        ...this.appointmentForm.value,
        status: AppointmentStatus.EN_ATTENTE,
        expertId: this.expertId,
        vehicleId: this.vehicleId
      };

      this.appointmentService.createAppointment(appointmentData).subscribe({
        next: () => {
          this.router.navigate(['/appointments']);
        },
        error: (error) => {
          console.error('Erreur lors de la création du rendez-vous:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
} 