import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService, Appointment, AppointmentStatus } from '../../../../core/services/appointment.service';
import { ExpertService } from '../../../../core/services/expert.service';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { AppointmentReply } from '../../../../protos/generated/appointment_pb';
import { ExpertReply } from '../../../../protos/generated/expert_pb';
import { VehicleReply } from '../../../../protos/generated/vehicle_pb';
import { ProfileService, UserProfile } from '../../../../core/services/profile.service';

@Component({
  selector: 'app-appointment-detail',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-extrabold text-indigo-700 flex items-center gap-2">
              <i class="fas fa-calendar-check text-indigo-400"></i>
              Détails du rendez-vous
            </h1>
            <button (click)="goBack()"
                    class="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-indigo-50 text-indigo-700 font-semibold rounded-lg shadow-sm border border-indigo-200 transition">
              <i class="fas fa-arrow-left"></i>
              Retour
            </button>
          </div>

          <div *ngIf="appointment" class="space-y-8">
            <!-- Informations générales -->
            <div>
              <h2 class="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <i class="fas fa-info-circle text-indigo-400"></i>
                Informations générales
              </h2>
              <div class="bg-gray-50 p-6 rounded-xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p class="mb-2"><i class="fas fa-calendar-alt text-indigo-400 mr-2"></i><strong>Date :</strong> {{ appointment.date | date:'long' }}</p>
                  <p class="mb-2"><i class="fas fa-map-marker-alt text-indigo-400 mr-2"></i><strong>Adresse :</strong> {{ appointment.address }}</p>
                  <p class="mb-2"><i class="fas fa-sticky-note text-indigo-400 mr-2"></i><strong>Notes :</strong> <span *ngIf="appointment.notes; else noNotes">{{ appointment.notes }}</span><ng-template #noNotes><span class="italic text-gray-400">Aucune</span></ng-template></p>
                  <p class="mb-2"><i class="fas fa-flag text-indigo-400 mr-2"></i><strong>Statut :</strong> <span [ngClass]="{
                    'text-yellow-600': appointment.status === 'EN_ATTENTE',
                    'text-green-600': appointment.status === 'CONFIRMÉ',
                    'text-blue-600': appointment.status === 'RÉALISÉ',
                    'text-red-600': appointment.status === 'ANNULÉ'
                  }">{{ getStatusLabel(appointment.status) }}</span></p>
                </div>
                <div class="space-y-4">
                  <div *ngIf="user" class="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                    <i class="fas fa-user text-indigo-400 text-xl"></i>
                    <div>
                      <div class="font-semibold">{{ user.firstName }} {{ user.lastName }}</div>
                      <div class="text-gray-500 text-sm" *ngIf="user.phone"><i class="fas fa-phone-alt mr-1"></i>{{ user.phone }}</div>
                    </div>
                  </div>
                  <div *ngIf="vehicle" class="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                    <i class="fas fa-car text-indigo-400 text-xl"></i>
                    <div>
                      <div class="font-semibold">{{ vehicle.getBrand() }} {{ vehicle.getModel() }} ({{ vehicle.getYear() }})</div>
                      <div class="text-gray-500 text-sm" *ngIf="vehicle.getVin()">Immatriculation (VIN) : {{ vehicle.getVin() }}</div>
                      <div class="text-gray-500 text-sm" *ngIf="vehicle.getPriceAnnounced()">Prix annoncé véhicule : {{ vehicle.getPriceAnnounced() / 100 | number:'1.2-2' }} €</div>
                    </div>
                  </div>
                  <div *ngIf="expert" class="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                    <i class="fas fa-euro-sign text-indigo-400 text-xl"></i>
                    <div>
                      <div class="font-semibold">Prix annoncé : {{ expert.getServicePrice()| number:'1.2-2' }} €</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-4 pt-8 border-t border-gray-100">
              <button *ngIf="canCancel()"
                      (click)="cancelAppointment()"
                      class="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 shadow-sm transition">
                Annuler le rendez-vous
              </button>
              <button *ngIf="canConfirm()"
                      (click)="confirmAppointment()"
                      class="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 shadow-sm transition">
                Confirmer le rendez-vous
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
  appointment?: Appointment;
  expert: ExpertReply | null = null;
  vehicle: VehicleReply | null = null;
  user: UserProfile | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private expertService: ExpertService,
    private vehicleService: VehicleService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAppointment(id);
    }
  }

  loadAppointment(id: string): void {
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (appointment: Appointment) => {
        this.appointment = appointment;
        if (appointment.userId) {
          this.profileService.getProfile().subscribe({
            next: (user: UserProfile) => {
              this.user = user;
            },
            error: (error: Error) => {
              console.error('Erreur lors du chargement du particulier:', error);
            }
          });
        }
        if (appointment.expertId) {
          this.expertService.getExpertById(appointment.expertId).subscribe({
            next: (expert: ExpertReply) => {
              this.expert = expert;
            },
            error: (error: Error) => {
              console.error('Erreur lors du chargement de l\'expert:', error);
            }
          });
        }
        if (appointment.vehicleId) {
          this.vehicleService.getVehicleById(appointment.vehicleId).subscribe({
            next: (vehicle: VehicleReply) => {
              this.vehicle = vehicle;
            },
            error: (error: Error) => {
              console.error('Erreur lors du chargement du véhicule:', error);
            }
          });
        }
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement du rendez-vous:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/appointments']);
  }

  canCancel(): boolean {
    return this.appointment?.status === AppointmentStatus.EN_ATTENTE ||
           this.appointment?.status === AppointmentStatus.CONFIRMÉ;
  }

  canConfirm(): boolean {
    return this.appointment?.status === AppointmentStatus.EN_ATTENTE;
  }

  cancelAppointment(): void {
    if (this.appointment) {
      this.appointmentService.cancelAppointment(this.appointment.id).subscribe({
        next: (message: string) => {
          this.loadAppointment(this.appointment!.id);
        },
        error: (error: Error) => {
          console.error('Erreur lors de l\'annulation du rendez-vous:', error);
        }
      });
    }
  }

  confirmAppointment(): void {
    if (this.appointment) {
      this.appointmentService.updateAppointmentStatus(
        this.appointment.id,
        AppointmentStatus.CONFIRMÉ
      ).subscribe({
        next: (message: string) => {
          this.loadAppointment(this.appointment!.id);
        },
        error: (error: Error) => {
          console.error('Erreur lors de la confirmation du rendez-vous:', error);
        }
      });
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