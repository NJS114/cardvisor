import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AppointmentService, Appointment, AppointmentStatus } from '../../../../core/services/appointment.service';
import { ExpertService } from '../../../../core/services/expert.service';
import { StripeService } from '../../../../core/services/stripe.service';

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
        <div class="max-w-7xl mx-auto">
          <h1 class="text-3xl font-bold mb-8">Mes Rendez-vous</h1>

          <!-- Rendez-vous en attente -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">
              En attente ({{ getAppointmentsByStatus(AppointmentStatus.EN_ATTENTE).length }})
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div *ngFor="let appointment of getAppointmentsByStatus(AppointmentStatus.EN_ATTENTE)"
                   class="bg-white rounded-lg shadow-md p-6">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <p class="font-medium">{{ appointment.date | date:'long' }}</p>
                    <p class="text-gray-600">{{ appointment.address }}</p>
                  </div>
                  <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    En attente
                  </span>
                </div>
                <div class="flex justify-end space-x-4">
                  <button (click)="confirmAppointment(appointment)"
                          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Confirmer
                  </button>
                  <button (click)="cancelAppointment(appointment)"
                          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Rendez-vous confirmés -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">
              Confirmés ({{ getAppointmentsByStatus(AppointmentStatus['CONFIRMÉ']).length }})
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div *ngFor="let appointment of getAppointmentsByStatus(AppointmentStatus['CONFIRMÉ'])"
                   class="bg-white rounded-lg shadow-md p-6">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <p class="font-medium">{{ appointment.date | date:'long' }}</p>
                    <p class="text-gray-600">{{ appointment.address }}</p>
                  </div>
                  <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Confirmé
                  </span>
                </div>
                <div class="flex justify-end space-x-4">
                  <button (click)="completeAppointment(appointment)"
                          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Terminer
                  </button>
                  <button (click)="cancelAppointment(appointment)"
                          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Rendez-vous terminés -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">
              Terminés ({{ getAppointmentsByStatus(AppointmentStatus['RÉALISÉ']).length }})
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div *ngFor="let appointment of getAppointmentsByStatus(AppointmentStatus['RÉALISÉ'])"
                   class="bg-white rounded-lg shadow-md p-6">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <p class="font-medium">{{ appointment.date | date:'long' }}</p>
                    <p class="text-gray-600">{{ appointment.address }}</p>
                  </div>
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Terminé
                  </span>
                </div>
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
                  <p class="font-medium">Client: {{ appointment.userId }}</p>
                  <p class="text-gray-600">{{ appointment.address }}</p>
                  <p class="text-sm text-gray-500">{{ appointment.date | date:'dd/MM/yyyy HH:mm' }}</p>
                  <p class="text-sm text-gray-500 mt-2">{{ appointment.notes }}</p>
                </div>
                <div class="flex flex-col items-end space-y-2">
                  <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">En attente</span>
                  <button (click)="acceptAppointment(appointment.id)"
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
                {{ getExpertAppointmentsByStatus(AppointmentStatus['CONFIRMÉ']).length }}
              </span>
            </div>
            <div class="grid gap-4">
              <div *ngIf="getExpertAppointmentsByStatus(AppointmentStatus['CONFIRMÉ']).length === 0" class="text-center py-8">
                <p class="text-gray-500">Aucun rendez-vous confirmé</p>
              </div>
              <div *ngFor="let appointment of getExpertAppointmentsByStatus(AppointmentStatus['CONFIRMÉ'])" 
                   class="bg-white rounded-lg shadow p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-medium">Client: {{ appointment.userId }}</p>
                    <p class="text-gray-600">{{ appointment.address }}</p>
                    <p class="text-sm text-gray-500">{{ appointment.date | date:'dd/MM/yyyy HH:mm' }}</p>
                    <p class="text-sm text-gray-500 mt-2">{{ appointment.notes }}</p>
                  </div>
                  <div class="flex flex-col items-end space-y-2">
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Confirmé</span>
                    <button (click)="completeAppointment(appointment)"
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
                {{ getExpertAppointmentsByStatus(AppointmentStatus['RÉALISÉ']).length }}
              </span>
            </div>
            <div class="grid gap-4">
              <div *ngIf="getExpertAppointmentsByStatus(AppointmentStatus['RÉALISÉ']).length === 0" class="text-center py-8">
                <p class="text-gray-500">Aucun rendez-vous réalisé</p>
              </div>
              <div *ngFor="let appointment of getExpertAppointmentsByStatus(AppointmentStatus['RÉALISÉ'])" 
                   class="bg-white rounded-lg shadow p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-medium">Client: {{ appointment.userId }}</p>
                    <p class="text-gray-600">{{ appointment.address }}</p>
                    <p class="text-sm text-gray-500">{{ appointment.date | date:'dd/MM/yyyy HH:mm' }}</p>
                    <p class="text-sm text-gray-500 mt-2">{{ appointment.notes }}</p>
                  </div>
                  <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Terminé</span>
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
  appointments: Appointment[] = [];
  pendingAppointments: Appointment[] = [];
  userRole: string = '';
  errorMessage = '';
  AppointmentStatus = AppointmentStatus;
  expertId: string | null = null;

  constructor(
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private expertService: ExpertService,
    public router: Router,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getCurrentUser()?.role || '';
    console.log('User Role:', this.userRole);

    if (this.userRole === 'EXPERT') {
      this.loadExpertId();
    } else {
      this.loadAppointments();
    }
  }

  private loadExpertId(): void {
    const userId = this.authService.getCurrentUser()?.id;
    if (userId) {
      this.expertService.getExpertById(userId).subscribe({
        next: (expert: any) => {
          this.expertId = expert.id;
          this.loadAppointments();
        },
        error: (error: Error) => {
          console.error('Erreur lors du chargement de l\'expert:', error);
          this.errorMessage = 'Erreur lors du chargement des informations de l\'expert';
        }
      });
    }
  }

  loadAppointments(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    if (user.role === 'EXPERT') {
      this.expertService.getExpertByUserId(user.id).subscribe({
        next: (expert) => {
          const expertId = typeof expert.getId === 'function' ? expert.getId() : undefined;
          if (!expertId) {
            console.error('Impossible de récupérer l\'id de l\'expert');
            this.errorMessage = 'Impossible de récupérer l\'id de l\'expert';
            return;
          }
          this.appointmentService.getAppointmentsByExpertId(expertId).subscribe({
            next: (appointments) => {
              this.appointments = appointments;
              this.pendingAppointments = this.getAppointmentsByStatus(AppointmentStatus.EN_ATTENTE);
            },
            error: (error) => {
              console.error('Erreur lors du chargement des rendez-vous:', error);
              this.errorMessage = 'Erreur lors du chargement des rendez-vous';
            }
          });
        },
        error: (error: any) => {
          console.error('Erreur lors de la récupération de l\'expert:', error);
          this.errorMessage = 'Erreur lors de la récupération de l\'expert';
        }
      });
    } else {
      this.appointmentService.getAppointmentsByUserId(user.id).subscribe({
        next: (appointments) => {
          this.appointments = appointments;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des rendez-vous:', error);
          this.errorMessage = 'Erreur lors du chargement des rendez-vous';
        }
      });
    }
  }

  getAppointmentsByStatus(status: AppointmentStatus): Appointment[] {
    return this.appointments.filter(a => a.status === status);
  }

  getExpertAppointmentsByStatus(status: AppointmentStatus): Appointment[] {
    return this.appointments.filter(appointment => appointment.status === status);
  }

  cancelAppointment(appointment: Appointment): void {
    this.appointmentService.cancelAppointment(appointment.id).subscribe({
      next: (message: string) => {
        this.loadAppointments();
      },
      error: (error) => {
        console.error('Erreur lors de l\'annulation du rendez-vous:', error);
        this.errorMessage = 'Erreur lors de l\'annulation du rendez-vous';
      }
    });
  }

  acceptAppointment(id: string): void {
    this.appointmentService.updateAppointmentStatus(id, AppointmentStatus['CONFIRMÉ']).subscribe({
      next: (message: string) => {
        this.loadAppointments();
      },
      error: (error) => {
        console.error('Erreur lors de l\'acceptation du rendez-vous:', error);
        this.errorMessage = 'Erreur lors de l\'acceptation du rendez-vous';
      }
    });
  }

  completeAppointment(appointment: Appointment): void {
    this.appointmentService.updateAppointmentStatus(appointment.id, AppointmentStatus['RÉALISÉ']).subscribe({
      next: (message: string) => {
        this.loadAppointments();
      },
      error: (error) => {
        console.error('Erreur lors de la finalisation du rendez-vous:', error);
        this.errorMessage = 'Erreur lors de la finalisation du rendez-vous';
      }
    });
  }

  confirmAppointment(appointment: Appointment): void {
    this.appointmentService.updateAppointmentStatus(appointment.id, AppointmentStatus['CONFIRMÉ']).subscribe({
      next: (message: string) => {
        this.loadAppointments();
      },
      error: (error) => {
        console.error('Erreur lors de la confirmation du rendez-vous:', error);
        this.errorMessage = 'Erreur lors de la confirmation du rendez-vous';
      }
    });
  }

  payWithStripeCheckout(appointment: Appointment): void {
    this.router.navigate(['/payments/form'], { queryParams: { appointmentId: appointment.id, mode: 'checkout' } });
  }

  payWithCard(appointment: Appointment): void {
    this.router.navigate(['/payments/form'], { queryParams: { appointmentId: appointment.id, mode: 'direct' } });
  }
} 