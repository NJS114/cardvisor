import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { ExpertService } from '../../../../core/services/expert.service';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { AppointmentReply, AppointmentsReply } from '../../../../protos/generated/appointment_pb';
import { ExpertReply } from '../../../../protos/generated/expert_pb';
import { VehicleReply } from '../../../../protos/generated/vehicle_pb';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-appointments-page',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Mes Rendez-vous</h1>
        <button (click)="createAppointment()"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          <i class="fas fa-plus mr-2"></i>
          Nouveau rendez-vous
        </button>
      </div>
      
      <div *ngIf="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div *ngIf="!loading && appointments.length === 0" class="text-center py-8">
        <p class="text-gray-500">Vous n'avez pas encore de rendez-vous.</p>
      </div>
      
      <div *ngIf="!loading && appointments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let appointment of appointments" 
             class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-semibold">{{ getVehicleModel(appointment.getVehicleId()) }}</h2>
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
            <p *ngIf="appointment.getAddress()">
              <i class="fas fa-map-marker-alt mr-2"></i>
              {{ appointment.getAddress() }}
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
export class ListAppointmentsPageComponent implements OnInit {
  appointments: AppointmentReply[] = [];
  loading = true;
  private expertCache: Map<string, ExpertReply> = new Map();
  private vehicleCache: Map<string, VehicleReply> = new Map();

  constructor(
    private appointmentService: AppointmentService,
    private expertService: ExpertService,
    private vehicleService: VehicleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  private loadAppointments(): void {
    const userId = localStorage.getItem('auth_token');
    if (!userId) {
      console.error('Aucun ID utilisateur trouvé');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.appointmentService.getAppointmentsByUserId(userId).subscribe({
      next: (response: AppointmentsReply) => {
        console.log('Rendez-vous chargés:', response.toObject());
        this.appointments = response.getAppointmentsList();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des rendez-vous:', error);
        this.loading = false;
      }
    });
  }

  getExpertName(expertId: string): string {
    if (this.expertCache.has(expertId)) {
      const expert = this.expertCache.get(expertId);
      return `${expert?.getFirstName()} ${expert?.getLastName()}`;
    }

    this.expertService.getExpertById(expertId).subscribe({
      next: (expert: ExpertReply) => {
        this.expertCache.set(expertId, expert);
        return `${expert.getFirstName()} ${expert.getLastName()}`;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'expert:', error);
        return 'Expert inconnu';
      }
    });

    return 'Chargement...';
  }

  getVehicleModel(vehicleId: string): string {
    if (this.vehicleCache.has(vehicleId)) {
      const vehicle = this.vehicleCache.get(vehicleId);
      return `${vehicle?.getBrand()} ${vehicle?.getModel()}`;
    }

    this.vehicleService.getVehicleById(vehicleId).subscribe({
      next: (vehicle: VehicleReply) => {
        this.vehicleCache.set(vehicleId, vehicle);
        return `${vehicle.getBrand()} ${vehicle.getModel()}`;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du véhicule:', error);
        return 'Véhicule inconnu';
      }
    });

    return 'Chargement...';
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 rounded text-sm font-medium';
    switch (status.toLowerCase()) {
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'completed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  createAppointment(): void {
    this.router.navigate(['/appointments/create']);
  }

  viewDetails(appointmentId: string): void {
    this.router.navigate(['/appointments', appointmentId]);
  }
} 