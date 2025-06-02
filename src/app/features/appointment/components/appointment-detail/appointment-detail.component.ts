import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { ExpertService } from '../../../../core/services/expert.service';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { AppointmentReply } from '../../../../protos/generated/appointment_pb';
import { ExpertReply } from '../../../../protos/generated/expert_pb';
import { VehicleReply } from '../../../../protos/generated/vehicle_pb';

@Component({
  selector: 'app-appointment-detail',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <!-- En-tête -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">Détails du Rendez-vous</h1>
          <button (click)="goBack()"
                  class="px-4 py-2 text-gray-600 hover:text-gray-800">
            <i class="fas fa-arrow-left mr-2"></i>
            Retour
          </button>
        </div>

        <!-- Carte principale -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6" *ngIf="appointment">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-2xl font-semibold mb-2">
                Rendez-vous du {{ appointment.getDate() | date:'dd/MM/yyyy HH:mm' }}
              </h2>
              <p class="text-gray-600">Statut: {{ appointment.getStatus() }}</p>
            </div>
          </div>

          <!-- Informations détaillées -->
          <div class="space-y-6">
            <!-- Expert -->
            <div *ngIf="expert">
              <h3 class="text-lg font-medium text-gray-900 mb-2">Expert</h3>
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-medium">
                  {{ expert.getFirstName() || '' }} {{ expert.getLastName() || '' }}
                </h4>
                <p class="text-gray-600">{{ expert.getSpecialities() || '' }}</p>
              </div>
            </div>

            <!-- Véhicule -->
            <div *ngIf="vehicle">
              <h3 class="text-lg font-medium text-gray-900 mb-2">Véhicule</h3>
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-medium">
                  {{ vehicle.getBrand() || '' }} {{ vehicle.getModel() || '' }}
                </h4>
                <p class="text-gray-600">
                  {{ vehicle.getYear() || '' }} - {{ vehicle.getMileage() || 0 }} km
                </p>
              </div>
            </div>

            <!-- Adresse -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Adresse</h3>
              <p class="text-gray-600">{{ appointment.getAddress() }}</p>
            </div>

            <!-- Notes -->
            <div *ngIf="appointment.getNotes()">
              <h3 class="text-lg font-medium text-gray-900 mb-2">Notes</h3>
              <p class="text-gray-600">{{ appointment.getNotes() }}</p>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-4 pt-6 border-t">
              <button (click)="cancelAppointment()" 
                      *ngIf="appointment.getStatus() === 'EN_ATTENTE'"
                      class="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50">
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  styles: []
})
export class AppointmentDetailComponent implements OnInit {
  appointment: AppointmentReply | null = null;
  expert: ExpertReply | null = null;
  vehicle: VehicleReply | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private expertService: ExpertService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAppointment(id);
    }
  }

  loadAppointment(id: string): void {
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (appointment: AppointmentReply) => {
        this.appointment = appointment;
        if (appointment.getExpertId()) {
          this.loadExpert(appointment.getExpertId());
        }
        if (appointment.getVehicleId()) {
          this.loadVehicle(appointment.getVehicleId());
        }
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement du rendez-vous:', error);
      }
    });
  }

  loadExpert(id: string): void {
    this.expertService.getExpertById(id).subscribe({
      next: (expert: ExpertReply) => {
        this.expert = expert;
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement de l\'expert:', error);
      }
    });
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

  goBack(): void {
    this.router.navigate(['/appointments']);
  }

  cancelAppointment(): void {
    if (this.appointment) {
      this.appointmentService.deleteAppointment(this.appointment.getId()).subscribe({
        next: () => {
          this.loadAppointment(this.appointment!.getId());
        },
        error: (error: Error) => {
          console.error('Erreur lors de l\'annulation du rendez-vous:', error);
        }
      });
    }
  }
} 