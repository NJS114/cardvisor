import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { VehicleReply } from '../../../../protos/generated/vehicle_pb';
import { AppointmentReply } from '../../../../protos/generated/appointment_pb';
import { AppointmentsReply } from '../../../../protos/generated/appointment_pb';

@Component({
  selector: 'app-vehicle-detail',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <!-- En-tête -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">Détails du Véhicule</h1>
          <button (click)="goBack()" class="px-4 py-2 text-gray-600 hover:text-gray-800">
            <i class="fas fa-arrow-left mr-2"></i> Retour
          </button>
        </div>

        <!-- Carte principale -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6" *ngIf="vehicle">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-2xl font-semibold mb-2">
                {{ vehicle.getBrand() }} {{ vehicle.getModel() }}
              </h2>
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
                    <span class="font-semibold">Année:</span> {{ vehicle.getYear() }}
                  </p>
                  <p class="text-gray-600">
                    <span class="font-semibold">Kilométrage:</span> {{ vehicle.getMileage() }} km
                  </p>
                </div>
                <div>
                  <p class="text-gray-600">
                    <span class="font-semibold">Carburant:</span> {{ vehicle.getFuelType() }}
                  </p>
                  <p class="text-gray-600">
                    <span class="font-semibold">Boîte:</span> {{ vehicle.getGearbox() }}
                  </p>
                </div>
                <div>
                  <p class="text-gray-600">
                    <i class="fas fa-barcode mr-2"></i> VIN: {{ vehicle.getVin() }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Historique des rendez-vous -->
            <div *ngIf="appointments && appointments.length > 0">
              <h3 class="text-lg font-medium text-gray-900 mb-2">Historique des rendez-vous</h3>
              <div class="space-y-4">
                <div *ngFor="let appointment of appointments" class="border rounded-lg p-4">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-medium">Date: {{ appointment.getDate() | date:'dd/MM/yyyy HH:mm' }}</p>
                      <p class="text-gray-600">Statut: {{ appointment.getStatus() }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-4 pt-6 border-t">
              <button (click)="editVehicle()" class="px-4 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50">
                Modifier
              </button>
              <button (click)="bookAppointment()" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
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
  appointments: AppointmentReply[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadVehicle(id);
      this.loadAppointments(id);
    }
  }

  loadVehicle(id: string): void {
    this.vehicleService.getVehicleById(id).subscribe({
      next: (vehicle: VehicleReply) => {
        this.vehicle = vehicle;
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement du véhicule:', error);
      }
    });
  }

  loadAppointments(vehicleId: string): void {
    this.appointmentService.getAllAppointments().subscribe(
      (response: AppointmentsReply) => {
        this.appointments = response.getAppointmentsList().filter(
          appointment => appointment.getVehicleId() === vehicleId
        );
      },
      (error: Error) => {
        console.error('Erreur lors du chargement des rendez-vous:', error);
        this.errorMessage = 'Erreur lors du chargement des rendez-vous';
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/vehicles']);
  }

  editVehicle(): void {
    if (this.vehicle) {
      this.router.navigate(['/vehicles', this.vehicle.getId(), 'edit']);
    }
  }

  bookAppointment(): void {
    if (this.vehicle) {
      this.router.navigate(['/appointments/new'], {
        queryParams: { vehicleId: this.vehicle.getId() }
      });
    }
  }
}
