import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService, CreateAppointmentData, AppointmentStatus } from '../../../../core/services/appointment.service';
import { ExpertService } from '../../../../core/services/expert.service';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { ExpertReply, ExpertsReply } from '../../../../protos/generated/expert_pb';
import { VehicleReply, VehiclesReply } from '../../../../protos/generated/vehicle_pb';

@Component({
  selector: 'app-create-appointment-page',
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Créer un nouveau rendez-vous
            </h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500">
              <p>Remplissez le formulaire ci-dessous pour planifier une expertise automobile.</p>
            </div>
            <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()" class="mt-5 space-y-6">
              <!-- Expert Selection -->
              <div>
                <label for="expertId" class="block text-sm font-medium text-gray-700">Expert</label>
                <select id="expertId" formControlName="expertId"
                        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="">Sélectionnez un expert</option>
                  <option *ngFor="let expert of experts" [value]="expert.getId()">
                    {{ expert.getFirstName() }} {{ expert.getLastName() }} - {{ expert.getSpecialities() }}
                  </option>
                </select>
                <div *ngIf="appointmentForm.get('expertId')?.touched && appointmentForm.get('expertId')?.errors" 
                     class="text-red-500 text-xs mt-1">
                  <div *ngIf="appointmentForm.get('expertId')?.errors?.['required']">L'expert est requis</div>
                </div>
              </div>

              <!-- Vehicle Selection -->
              <div>
                <label for="vehicleId" class="block text-sm font-medium text-gray-700">Véhicule</label>
                <select id="vehicleId" formControlName="vehicleId"
                        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="">Sélectionnez un véhicule</option>
                  <option *ngFor="let vehicle of vehicles" [value]="vehicle.getId()">
                    {{ vehicle.getBrand() }} {{ vehicle.getModel() }} ({{ vehicle.getYear() }})
                  </option>
                </select>
                <div *ngIf="appointmentForm.get('vehicleId')?.touched && appointmentForm.get('vehicleId')?.errors" 
                     class="text-red-500 text-xs mt-1">
                  <div *ngIf="appointmentForm.get('vehicleId')?.errors?.['required']">Le véhicule est requis</div>
                </div>
              </div>

              <!-- Date Selection -->
              <div>
                <label for="date" class="block text-sm font-medium text-gray-700">Date du rendez-vous</label>
                <input type="datetime-local" id="date" formControlName="date"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <div *ngIf="appointmentForm.get('date')?.touched && appointmentForm.get('date')?.errors" 
                     class="text-red-500 text-xs mt-1">
                  <div *ngIf="appointmentForm.get('date')?.errors?.['required']">La date est requise</div>
                </div>
              </div>

              <!-- Address -->
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700">Adresse</label>
                <input type="text" id="address" formControlName="address"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       placeholder="Adresse du rendez-vous">
                <div *ngIf="appointmentForm.get('address')?.touched && appointmentForm.get('address')?.errors" 
                     class="text-red-500 text-xs mt-1">
                  <div *ngIf="appointmentForm.get('address')?.errors?.['required']">L'adresse est requise</div>
                </div>
              </div>

              <!-- Notes -->
              <div>
                <label for="notes" class="block text-sm font-medium text-gray-700">Notes additionnelles</label>
                <textarea id="notes" formControlName="notes" rows="3"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Informations supplémentaires sur le rendez-vous..."></textarea>
              </div>

              <!-- Submit Button -->
              <div class="flex justify-end">
                <button type="button" (click)="router.navigate(['/appointments'])"
                        class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Annuler
                </button>
                <button type="submit" [disabled]="appointmentForm.invalid || loading"
                        class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                  <span *ngIf="loading" class="mr-2">
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  Créer le rendez-vous
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CreateAppointmentPageComponent implements OnInit {
  appointmentForm: FormGroup;
  experts: ExpertReply[] = [];
  vehicles: VehicleReply[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private expertService: ExpertService,
    private vehicleService: VehicleService,
    public router: Router
  ) {
    this.appointmentForm = this.fb.group({
      expertId: ['', Validators.required],
      vehicleId: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadExperts();
    this.loadVehicles();
  }

  private loadExperts(): void {
    this.expertService.getAllExperts().subscribe({
      next: (response: ExpertsReply) => {
        console.log('Experts chargés:', response.toObject());
        this.experts = response.getExpertsList();
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des experts:', error);
      }
    });
  }

  private loadVehicles(): void {
    const userId = localStorage.getItem('auth_token');
    if (!userId) {
      console.error('Aucun ID utilisateur trouvé');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.vehicleService.getVehiclesByUserId(userId).subscribe({
      next: (response: VehiclesReply) => {
        console.log('Véhicules chargés:', response.toObject());
        this.vehicles = response.getVehiclesList();
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des véhicules:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.loading = true;
      const userId = localStorage.getItem('auth_token');
      if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        this.router.navigate(['/auth/login']);
        return;
      }

      const formValue = this.appointmentForm.value;
      const formData: CreateAppointmentData = {
        userId,
        expertId: formValue.expertId,
        vehicleId: formValue.vehicleId,
        date: formValue.date,
        address: formValue.address,
        status: AppointmentStatus.EN_ATTENTE,
        notes: formValue.notes
      };

      this.appointmentService.createAppointment(formData).subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/appointments']);
        },
        (error: Error) => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la création du rendez-vous';
          console.error('Erreur:', error);
        }
      );
    }
  }
} 