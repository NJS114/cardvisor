import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { ExpertService } from '../../../../core/services/expert.service';
import { AppointmentReply, AppointmentsReply } from '../../../../protos/generated/appointment_pb';
import { ExpertReply, ExpertsReply } from '../../../../protos/generated/expert_pb';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Mes Rendez-vous</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let appointment of appointments" 
             class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-semibold">{{ appointment.getVehicle()?.getModel() || 'Véhicule non spécifié' }}</h2>
            <span [class]="getStatusClass(appointment.getStatus())">
              {{ appointment.getStatus() }}
            </span>
          </div>
          
          <div class="space-y-2 text-gray-600">
            <p>
              <i class="fas fa-calendar mr-2"></i>
              {{ formatDate(appointment.getDate()) }}
            </p>
            <p>
              <i class="fas fa-clock mr-2"></i>
              {{ formatTime(appointment.getDate()) }}
            </p>
            <p>
              <i class="fas fa-user mr-2"></i>
              {{ getExpertName(appointment.getExpertId()) }}
            </p>
          </div>
          
          <div class="mt-6 flex justify-end space-x-4">
            <button (click)="viewDetails(appointment.getId())"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Voir détails
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AppointmentListComponent implements OnInit {
  appointments: AppointmentReply[] = [];
  experts: Map<string, ExpertReply> = new Map();

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
      next: (response: ExpertsReply) => {
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
    const userId = this.authService.getToken();
    if (userId) {
      this.appointmentService.getAppointmentsByUserId(userId).subscribe({
        next: (response: AppointmentsReply) => {
          this.appointments = response.getAppointmentsList();
        },
        error: (error: Error) => {
          console.error('Erreur lors du chargement des rendez-vous:', error);
        }
      });
    }
  }

  getExpertName(expertId: string): string {
    const expert = this.experts.get(expertId);
    return expert ? `${expert.getFirstName()} ${expert.getLastName()}` : 'Expert non trouvé';
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

  getStatusClass(status: string): string {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'PENDING':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'CONFIRMED':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'CANCELLED':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'COMPLETED':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  viewDetails(id: string): void {
    this.router.navigate(['/appointments', id]);
  }
} 