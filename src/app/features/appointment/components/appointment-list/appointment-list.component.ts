import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentService, Appointment, AppointmentStatus } from '../../../../core/services/appointment.service';
import { ExpertService } from '../../../../core/services/expert.service';
import { AppointmentReply, AppointmentsReply } from '../../../../protos/generated/appointment_pb';
import { ExpertReply } from '../../../../protos/generated/expert_pb';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Mes Rendez-vous</h1>

        <div *ngIf="loading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>

        <div *ngIf="!loading && appointments.length === 0" class="text-center py-8">
          <p class="text-gray-500">Aucun rendez-vous trouvé</p>
        </div>

        <div *ngIf="!loading && appointments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let appointment of appointments" 
               class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <p class="font-medium">{{ appointment.date | date:'long' }}</p>
                <p class="text-gray-600">{{ appointment.address }}</p>
              </div>
              <span [class]="getStatusClass(appointment.status)">
                {{ getStatusLabel(appointment.status) }}
              </span>
            </div>
            <div class="flex justify-end space-x-4">
              <button (click)="viewAppointment(appointment.id)"
                      class="px-4 py-2 text-blue-600 hover:text-blue-800">
                Voir détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  experts: Map<string, ExpertReply> = new Map();
  loading = false;
  AppointmentStatus = AppointmentStatus;

  constructor(
    private appointmentService: AppointmentService,
    private expertService: ExpertService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadExperts();
    this.loadAppointments();
  }

  loadExperts(): void {
    this.expertService.getAllExperts().subscribe({
      next: (response) => {
        response.getExpertsList().forEach(expert => {
          this.experts.set(expert.getId(), expert);
        });
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement des experts:', error);
      }
    });
  }

  loadAppointments(): void {
    this.loading = true;
    this.appointmentService.getAllAppointments().subscribe({
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

  getExpertName(expertId: string): string {
    const expert = this.experts.get(expertId);
    return expert ? `${expert.getFirstName()} ${expert.getLastName()}` : 'Expert non trouvé';
  }

  getVehicleModel(vehicleId: string): string {
    // TODO: Implémenter la récupération du modèle du véhicule
    return 'Modèle du véhicule';
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Date non spécifiée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(dateString: string): string {
    if (!dateString) return 'Heure non spécifiée';
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
        return 'Réalisé';
      case AppointmentStatus.ANNULÉ:
        return 'Annulé';
      default:
        return 'Inconnu';
    }
  }

  viewAppointment(id: string): void {
    this.router.navigate(['/appointments', id]);
  }
} 