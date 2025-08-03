import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpertService } from '../../../../core/services/expert.service';
import { AppointmentService, Appointment, AppointmentStatus } from '../../../../core/services/appointment.service';
import { ExpertReply } from '../../../../protos/generated/expert_pb';

@Component({
  selector: 'app-expert-detail',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <!-- En-tête -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">Profil de l'Expert</h1>
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
              <i class="fas fa-user text-gray-500 text-4xl"></i>
            </div>
            <div>
              <h2 class="text-2xl font-semibold mb-2">
                {{ expert?.getFirstName() }} {{ expert?.getLastName() }}
              </h2>
              <p class="text-gray-600 text-lg">{{ expert?.getSpecialities() }}</p>
            </div>
          </div>

          <!-- Informations détaillées -->
          <div class="space-y-6">
            <!-- Expérience -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Expérience</h3>
              <p class="text-gray-600">
                <i class="fas fa-graduation-cap mr-2"></i>
                {{ expert?.getYearsOfExperience() }} ans d'expérience
              </p>
            </div>

            <!-- Évaluation -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Évaluation</h3>
              <div class="flex items-center">
                <div class="flex items-center mr-4">
                  <i class="fas fa-star text-yellow-400 mr-1"></i>
                  <span class="text-lg font-medium">{{ expert?.getRating() }}/5</span>
                </div>
                <span class="text-gray-600">({{ expert?.getReviewCount() }} avis)</span>
              </div>
            </div>

            <!-- Disponibilité -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Disponibilité</h3>
              <p class="text-gray-600">
                <i class="fas fa-calendar-check mr-2"></i>
                {{ expert?.getIsAvailable() ? 'Disponible' : 'Non disponible' }}
              </p>
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
export class ExpertDetailComponent implements OnInit {
  expert?: ExpertReply;
  appointments: Appointment[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expertService: ExpertService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadExpert(id);
      this.loadAppointments(id);
    }
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

  loadAppointments(expertId: string): void {
    this.loading = true;
    this.appointmentService.getAppointmentsByExpertId(expertId).subscribe({
      next: (appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement des rendez-vous:', error);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/experts']);
  }

  bookAppointment(): void {
    if (this.expert) {
      this.router.navigate(['/appointments/create'], {
        queryParams: { expertId: this.expert.getId() }
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