import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { AppointmentService, Appointment, AppointmentStatus } from '../../../../core/services/appointment.service';
import { VehicleReply } from '../../../../protos/generated/vehicle_pb';

@Component({
  selector: 'app-vehicle-detail',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <!-- En-tête -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">Détails du Véhicule</h1>
          <button (click)="goBack()"
                  class="px-4 py-2 text-gray-600 hover:text-gray-800">
            <i class="fas fa-arrow-left mr-2"></i>
            Retour
          </button>
        </div>

        <!-- Carte principale -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex items-center mb-6">
            <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mr-6">
              <i class="fas fa-car text-gray-500 text-4xl"></i>
            </div>
            <div>
              <h2 class="text-2xl font-semibold mb-2">
                {{ vehicle?.getBrand() }} {{ vehicle?.getModel() }}
              </h2>
              <p class="text-gray-600 text-lg">Année: {{ vehicle?.getYear() }}</p>
            </div>
          </div>

          <!-- Informations détaillées -->
          <div class="space-y-6">
            <!-- Caractéristiques -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Caractéristiques</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-gray-600">
                    <i class="fas fa-tachometer-alt mr-2"></i>
                    Kilométrage: {{ vehicle?.getKilometers() }} km
                  </p>
                </div>
                <div>
                  <p class="text-gray-600">
                    <i class="fas fa-gas-pump mr-2"></i>
                    Carburant: {{ vehicle?.getFuelType() }}
                  </p>
                </div>
                <div>
                  <p class="text-gray-600">
                    <i class="fas fa-car mr-2"></i>
                    État: {{ vehicle?.getState() }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Rendez-vous -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Rendez-vous</h3>
              <div *ngIf="loading" class="flex justify-center items-center py-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              
              <div *ngIf="!loading && appointments.length === 0" class="text-center py-4">
                <p class="text-gray-500">Aucun rendez-vous prévu</p>
              </div>

              <div *ngIf="!loading && appointments.length > 0" class="space-y-4">
                <div *ngFor="let appointment of appointments" 
                     class="bg-gray-50 rounded-lg p-4">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-medium">
                        <i class="fas fa-calendar mr-2"></i>
                        {{ appointment.date | date:'long' }}
                      </p>
                      <p class="text-gray-600 mt-1">
                        <i class="fas fa-clock mr-2"></i>
                        {{ appointment.durationMinutes }} minutes
                      </p>
                      <p class="text-gray-600 mt-1">
                        <i class="fas fa-map-marker-alt mr-2"></i>
                        {{ appointment.address }}
                      </p>
                    </div>
                    <span [class]="getStatusClass(appointment.status)">
                      {{ getStatusLabel(appointment.status) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-4 pt-6 border-t">
              <button (click)="bookAppointment()"
                      class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class VehicleDetailComponent implements OnInit {
  vehicle: VehicleReply | null = null;
  appointments: Appointment[] = [];
  loading = false;
  errorMessage: string | null = null;
  vehicleId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vehicleId = id;
      this.loadVehicle(id);
      this.loadAppointments();
    }
  }

  loadVehicle(id: string): void {
    this.vehicleService.getVehicleById(id).subscribe({
      next: (vehicle: VehicleReply) => {
        this.vehicle = vehicle;
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement du véhicule:', error);
        this.errorMessage = 'Erreur lors du chargement du véhicule';
      }
    });
  }

  loadAppointments(): void {
    if (!this.vehicleId) return;
    
    this.loading = true;
    this.appointmentService.getAllAppointments().subscribe({
      next: (appointments: Appointment[]) => {
        this.appointments = appointments.filter(appointment => 
          appointment.vehicleId === this.vehicleId
        );
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement des rendez-vous:', error);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/vehicles']);
  }

  bookAppointment(): void {
    if (this.vehicleId) {
      this.router.navigate(['/appointments/create'], {
        queryParams: { vehicleId: this.vehicleId }
      });
    }
  }

  getStatusClass(status: AppointmentStatus): string {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case AppointmentStatus.EN_ATTENTE:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case AppointmentStatus.CONFIRMÉ:
        return `${baseClasses} bg-green-100 text-green-800`;
      case AppointmentStatus.ANNULÉ:
        return `${baseClasses} bg-red-100 text-red-800`;
      case AppointmentStatus.RÉALISÉ:
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getStatusLabel(status: AppointmentStatus): string {
    switch (status) {
      case AppointmentStatus.EN_ATTENTE:
        return 'En attente';
      case AppointmentStatus.CONFIRMÉ:
        return 'Confirmé';
      case AppointmentStatus.RÉALISÉ:
        return 'Terminé';
      case AppointmentStatus.ANNULÉ:
        return 'Annulé';
      default:
        return 'Inconnu';
    }
  }
}
