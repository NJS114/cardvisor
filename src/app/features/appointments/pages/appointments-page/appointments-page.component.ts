import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AppointmentService, AppointmentStatus, CreateAppointmentData } from '../../../../core/services/appointment.service';
import { AppointmentReply, AppointmentsReply } from '../../../../protos/generated/appointment_pb';
import { ExpertService } from '../../../../core/services/expert.service';

@Component({
  selector: 'app-appointments-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- Messages de débogage -->
      <div *ngIf="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ errorMessage }}
      </div>
      <div class="text-sm text-gray-500 mb-4">
        Role: {{ userRole }} | Expert ID: {{ expertId }}
      </div>

      <!-- Vue Particulier -->
      <ng-container *ngIf="userRole === 'USER'">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">Mes Rendez-vous</h1>
          <button (click)="router.navigate(['/appointments/create'])"
                  class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            <i class="fas fa-plus mr-2"></i>
            Nouveau rendez-vous
          </button>
        </div>
        
        <!-- Rendez-vous en Attente -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <h2 class="text-xl font-semibold">🕒 Rendez-vous en Attente</h2>
            <span class="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              {{ getAppointmentsByStatus(AppointmentStatus.EN_ATTENTE).length }}
            </span>
          </div>
          <div class="grid gap-4">
            <div *ngFor="let appointment of getAppointmentsByStatus(AppointmentStatus.EN_ATTENTE)" 
                 class="bg-white rounded-lg shadow p-4">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium">Expert: {{ appointment.getExpertId() || 'Non assigné' }}</p>
                  <p class="text-gray-600">{{ appointment.getAddress() }}</p>
                  <p class="text-sm text-gray-500">{{ appointment.getDate() | date:'dd/MM/yyyy HH:mm' }}</p>
                </div>
                <div class="flex flex-col items-end space-y-2">
                  <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">En attente</span>
                  <button (click)="cancelAppointment(appointment.getId())"
                          class="px-3 py-1 text-sm text-red-600 hover:text-red-800">
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Rendez-vous Confirmés -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <h2 class="text-xl font-semibold">📅 Rendez-vous Confirmés</h2>
            <span class="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {{ getAppointmentsByStatus(AppointmentStatus.CONFIRME).length }}
            </span>
          </div>
          <div class="grid gap-4">
            <div *ngFor="let appointment of getAppointmentsByStatus(AppointmentStatus.CONFIRME)" 
                 class="bg-white rounded-lg shadow p-4">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium">Expert: {{ appointment.getExpertId() }}</p>
                  <p class="text-gray-600">{{ appointment.getAddress() }}</p>
                  <p class="text-sm text-gray-500">{{ appointment.getDate() | date:'dd/MM/yyyy HH:mm' }}</p>
                </div>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Confirmé</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Rendez-vous Réalisés -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <h2 class="text-xl font-semibold">✅ Rendez-vous Réalisés</h2>
            <span class="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {{ getAppointmentsByStatus(AppointmentStatus.REALISE).length }}
            </span>
          </div>
          <div class="grid gap-4">
            <div *ngFor="let appointment of getAppointmentsByStatus(AppointmentStatus.REALISE)" 
                 class="bg-white rounded-lg shadow p-4">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium">Expert: {{ appointment.getExpertId() }}</p>
                  <p class="text-gray-600">{{ appointment.getAddress() }}</p>
                  <p class="text-sm text-gray-500">{{ appointment.getDate() | date:'dd/MM/yyyy HH:mm' }}</p>
                </div>
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Réalisé</span>
              </div>
            </div>
          </div>
        </div>
      </ng-container>

      <!-- Vue Expert -->
      <ng-container *ngIf="userRole === 'EXPERT'">
        <h1 class="text-3xl font-bold mb-8">Gestion des Rendez-vous</h1>

        <!-- Rendez-vous en Attente -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <h2 class="text-xl font-semibold">🔍 Rendez-vous en Attente</h2>
            <span class="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              {{ pendingAppointments.length }}
            </span>
          </div>
          <div class="grid gap-4">
            <div *ngIf="pendingAppointments.length === 0" class="text-center py-8">
              <p class="text-gray-500">Aucun rendez-vous en attente</p>
            </div>
            <div *ngFor="let appointment of pendingAppointments" 
                 class="bg-white rounded-lg shadow p-4">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium">Client: {{ appointment.getUserId() }}</p>
                  <p class="text-gray-600">{{ appointment.getAddress() }}</p>
                  <p class="text-sm text-gray-500">{{ appointment.getDate() | date:'dd/MM/yyyy HH:mm' }}</p>
                  <p class="text-sm text-gray-500 mt-2">{{ appointment.getNotes() }}</p>
                </div>
                <div class="flex flex-col items-end space-y-2">
                  <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">En attente</span>
                  <button (click)="acceptAppointment(appointment.getId())"
                          class="px-3 py-1 text-sm text-green-600 hover:text-green-800">
                    Accepter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mes Rendez-vous -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold mb-6">🔹 Mes Rendez-vous</h2>
          
          <!-- Rendez-vous Confirmés -->
          <div class="mb-8">
            <div class="flex items-center mb-4">
              <h3 class="text-xl font-semibold">📅 Rendez-vous Confirmés</h3>
              <span class="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {{ getExpertAppointmentsByStatus(AppointmentStatus.CONFIRME).length }}
              </span>
            </div>
            <div class="grid gap-4">
              <div *ngIf="getExpertAppointmentsByStatus(AppointmentStatus.CONFIRME).length === 0" class="text-center py-8">
                <p class="text-gray-500">Aucun rendez-vous confirmé</p>
              </div>
              <div *ngFor="let appointment of getExpertAppointmentsByStatus(AppointmentStatus.CONFIRME)" 
                   class="bg-white rounded-lg shadow p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-medium">Client: {{ appointment.getUserId() }}</p>
                    <p class="text-gray-600">{{ appointment.getAddress() }}</p>
                    <p class="text-sm text-gray-500">{{ appointment.getDate() | date:'dd/MM/yyyy HH:mm' }}</p>
                    <p class="text-sm text-gray-500 mt-2">{{ appointment.getNotes() }}</p>
                  </div>
                  <div class="flex flex-col items-end space-y-2">
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Confirmé</span>
                    <button (click)="completeAppointment(appointment.getId())"
                            class="px-3 py-1 text-sm text-green-600 hover:text-green-800">
                      Terminer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Rendez-vous Réalisés -->
          <div class="mb-8">
            <div class="flex items-center mb-4">
              <h3 class="text-xl font-semibold">✅ Rendez-vous Réalisés</h3>
              <span class="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {{ getExpertAppointmentsByStatus(AppointmentStatus.REALISE).length }}
              </span>
            </div>
            <div class="grid gap-4">
              <div *ngIf="getExpertAppointmentsByStatus(AppointmentStatus.REALISE).length === 0" class="text-center py-8">
                <p class="text-gray-500">Aucun rendez-vous réalisé</p>
              </div>
              <div *ngFor="let appointment of getExpertAppointmentsByStatus(AppointmentStatus.REALISE)" 
                   class="bg-white rounded-lg shadow p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-medium">Client: {{ appointment.getUserId() }}</p>
                    <p class="text-gray-600">{{ appointment.getAddress() }}</p>
                    <p class="text-sm text-gray-500">{{ appointment.getDate() | date:'dd/MM/yyyy HH:mm' }}</p>
                    <p class="text-sm text-gray-500 mt-2">{{ appointment.getNotes() }}</p>
                  </div>
                  <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Réalisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
    }
  `]
})
export class AppointmentsPageComponent implements OnInit {
  appointments: AppointmentReply[] = [];
  pendingAppointments: AppointmentReply[] = [];
  userRole: string = '';
  errorMessage = '';
  AppointmentStatus = AppointmentStatus;
  expertId: string | null = null;

  constructor(
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private expertService: ExpertService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getCurrentUser()?.role || '';
    console.log('User Role:', this.userRole); // Debug log

    if (this.userRole === 'EXPERT') {
      this.loadExpertId();
    } else {
      this.loadAppointments();
    }
  }

  private loadExpertId(): void {
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) {
      console.error('ID utilisateur manquant');
      return;
    }

    this.expertService.getAllExperts().subscribe({
      next: (response) => {
        const experts = response.getExpertsList();
        const expert = experts.find(e => e.getUserId() === userId);
        
        if (expert) {
          this.expertId = expert.getId();
          console.log('Expert ID:', this.expertId); // Debug log
          this.loadAppointments();
        } else {
          console.error('Expert non trouvé pour l\'utilisateur:', userId);
          this.errorMessage = 'Expert non trouvé';
        }
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement des experts:', error);
        this.errorMessage = 'Erreur lors du chargement des informations de l\'expert';
      }
    });
  }

  loadAppointments(): void {
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) {
      console.error('ID utilisateur manquant');
      return;
    }

    console.log('Loading appointments for role:', this.userRole); // Debug log

    if (this.userRole === 'USER') {
      this.appointmentService.getAppointmentsByUserId(userId).subscribe({
        next: (response: AppointmentsReply) => {
          this.appointments = response.getAppointmentsList();
          console.log('User appointments loaded:', this.appointments.length); // Debug log
        },
        error: (error: Error) => {
          console.error('Erreur lors du chargement des rendez-vous:', error);
          this.errorMessage = 'Erreur lors du chargement des rendez-vous';
        }
      });
    } else if (this.userRole === 'EXPERT' && this.expertId) {
      // Charger les rendez-vous assignés à l'expert
      this.appointmentService.getAppointmentsByExpertId(this.expertId).subscribe({
        next: (response: AppointmentsReply) => {
          this.appointments = response.getAppointmentsList();
          console.log('Expert appointments loaded:', this.appointments.length); // Debug log
        },
        error: (error: Error) => {
          console.error('Erreur lors du chargement des rendez-vous de l\'expert:', error);
          this.errorMessage = 'Erreur lors du chargement des rendez-vous';
        }
      });

      // Pour les rendez-vous en attente, on récupère tous les rendez-vous et on filtre
      this.appointmentService.getAllAppointments().subscribe({
        next: (response: AppointmentsReply) => {
          this.pendingAppointments = response.getAppointmentsList().filter(
            appointment => 
              appointment.getStatus() === AppointmentStatus.EN_ATTENTE && 
              (!appointment.getExpertId() || appointment.getExpertId() === '')
          );
          console.log('Pending appointments loaded:', this.pendingAppointments.length); // Debug log
        },
        error: (error: Error) => {
          console.error('Erreur lors du chargement des rendez-vous en attente:', error);
          this.errorMessage = 'Erreur lors du chargement des rendez-vous en attente';
        }
      });
    }
  }

  getAppointmentsByStatus(status: AppointmentStatus): AppointmentReply[] {
    return this.appointments.filter(appointment => appointment.getStatus() === status);
  }

  getExpertAppointmentsByStatus(status: AppointmentStatus): AppointmentReply[] {
    return this.appointments.filter(appointment => appointment.getStatus() === status);
  }

  getPendingAppointments(): AppointmentReply[] {
    return this.pendingAppointments || [];
  }

  cancelAppointment(id: string): void {
    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        this.loadAppointments();
      },
      error: (error: Error) => {
        this.errorMessage = 'Erreur lors de l\'annulation du rendez-vous';
        console.error('Erreur:', error);
      }
    });
  }

  acceptAppointment(id: string): void {
    const appointment = this.pendingAppointments.find(a => a.getId() === id);
    if (!appointment || !this.expertId) return;

    const updateData: CreateAppointmentData = {
      date: appointment.getDate(),
      address: appointment.getAddress(),
      notes: appointment.getNotes(),
      status: AppointmentStatus.CONFIRME,
      userId: appointment.getUserId(),
      expertId: this.expertId,
      vehicleId: appointment.getVehicleId()
    };

    this.appointmentService.createAppointment(updateData).subscribe({
      next: () => {
        this.loadAppointments();
      },
      error: (error: Error) => {
        this.errorMessage = 'Erreur lors de l\'acceptation du rendez-vous';
        console.error('Erreur:', error);
      }
    });
  }

  completeAppointment(id: string): void {
    const appointment = this.appointments.find(a => a.getId() === id);
    if (!appointment) return;

    const updateData: CreateAppointmentData = {
      date: appointment.getDate(),
      address: appointment.getAddress(),
      notes: appointment.getNotes(),
      status: AppointmentStatus.REALISE,
      userId: appointment.getUserId(),
      expertId: appointment.getExpertId(),
      vehicleId: appointment.getVehicleId()
    };

    this.appointmentService.createAppointment(updateData).subscribe({
      next: () => {
        this.loadAppointments();
      },
      error: (error: Error) => {
        this.errorMessage = 'Erreur lors de la finalisation du rendez-vous';
        console.error('Erreur:', error);
      }
    });
  }
} 