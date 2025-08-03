import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService, UserProfile } from '../../../../core/services/profile.service';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { AppointmentService, Appointment, AppointmentStatus } from '../../../../core/services/appointment.service';
import { VehicleReply, VehiclesReply } from '../../../../protos/generated/vehicle_pb';
import { AppointmentReply, AppointmentsReply } from '../../../../protos/generated/appointment_pb';
import { StripeService, StripeAccount } from '../../../../core/services/stripe.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ExpertService } from '../../../../core/services/expert.service';
import { ExpertFinanceDashboardComponent } from 'src/app/features/profile/components/expert-finance-dashboard/expert-finance-dashboard.component';
import { ExpertAppointmentsTableComponent } from 'src/app/features/profile/components/expert-appointments-table/expert-appointments-table.component';
import { ExpertCertificationsComponent } from 'src/app/features/profile/components/expert-certifications/expert-certifications.component';
import { ExpertReviewsComponent } from 'src/app/features/profile/components/expert-reviews/expert-reviews.component';
import { ExpertSettingsComponent } from 'src/app/features/profile/components/expert-settings/expert-settings.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ExpertFinanceDashboardComponent,
    ExpertAppointmentsTableComponent,
    ExpertCertificationsComponent,
    ExpertReviewsComponent,
    ExpertSettingsComponent
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-7xl mx-auto">
        <ng-container *ngIf="user?.role === 'EXPERT'; else userProfile">
          <h1 class="text-3xl font-bold mb-8">Mon Dashboard Expert</h1>

          <!-- 1. Dashboard financier -->
          <section class="mb-8">
            <expert-finance-dashboard [appointments]="appointments"></expert-finance-dashboard>
          </section>

          <!-- 2. Rendez-vous de l'expert -->
          <section class="mb-8">
            <expert-appointments-table [appointments]="appointments"></expert-appointments-table>
          </section>

          <!-- 3. Certifications -->
          <section class="mb-8">
            <expert-certifications [expertId]="expertId"></expert-certifications>
          </section>

          <!-- 4. Avis & évaluations -->
          <section class="mb-8">
            <expert-reviews [expertId]="expertId"></expert-reviews>
          </section>

          <!-- 5. Compte Stripe -->
          <section class="mb-8">
            <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 border border-gray-100 w-full max-w-lg mx-auto">
              <div class="flex items-center gap-3 mb-2">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="8" fill="#635BFF"/>
                  <path d="M25.5 19.5C25.5 17.0147 23.4853 15 21 15H15V27H21C23.4853 27 25.5 24.9853 25.5 22.5V19.5Z" fill="white"/>
                </svg>
                <h2 class="text-2xl font-bold text-gray-900">Compte Stripe</h2>
              </div>
              <div class="w-full">
                <div *ngIf="stripeError" class="text-red-600 mb-2">{{ stripeError }}</div>
                <div *ngIf="stripeSuccess" class="text-green-600 mb-2">{{ stripeSuccess }}</div>
                <ng-container *ngIf="stripeAccount; else noStripe">
                  <ng-container *ngIf="stripeAccount.isChargesEnabled && stripeAccount.isPayoutsEnabled; else incompleteStripe">
                    <p class="mb-2 text-green-700">Votre compte Stripe est actif !</p>
                    <p><strong>ID Stripe :</strong> {{ stripeAccount.stripeAccountId }}</p>
                  </ng-container>
                  <ng-template #incompleteStripe>
                    <p class="mb-2 text-yellow-700">Votre compte Stripe n'est pas encore activé.</p>
                    <button (click)="createStripeAccount()" [disabled]="stripeLoading"
                            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold shadow">
                      <span *ngIf="stripeLoading" class="animate-spin mr-2">⏳</span>
                      Créer mon compte Stripe
                    </button>
                  </ng-template>
                </ng-container>
                <ng-template #noStripe>
                  <button (click)="createStripeAccount()" [disabled]="stripeLoading"
                          class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold shadow">
                    <span *ngIf="stripeLoading" class="animate-spin mr-2">⏳</span>
                    Créer mon compte Stripe
                  </button>
                </ng-template>
              </div>
            </div>
          </section>

          <!-- 6. Paramètres expert -->
          <section class="mb-8">
            <expert-settings [expert]="expert"></expert-settings>
          </section>
        </ng-container>

        <ng-template #userProfile>
          <h1 class="text-3xl font-bold mb-8">Mon Profil</h1>

          <div *ngIf="loading" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>

          <div *ngIf="!loading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Informations personnelles -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-semibold mb-4">Informations personnelles</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Nom</label>
                  <p class="mt-1 text-gray-900">{{ user?.firstName }} {{ user?.lastName }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <p class="mt-1 text-gray-900">{{ user?.email }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Téléphone</label>
                  <p class="mt-1 text-gray-900">{{ user?.phone }}</p>
                </div>
              </div>
            </div>

            <!-- Rendez-vous récents -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-semibold mb-4">Rendez-vous récents</h2>
              <div *ngIf="appointments.length === 0" class="text-center py-4">
                <p class="text-gray-500">Aucun rendez-vous trouvé</p>
              </div>
              <div *ngIf="appointments.length > 0" class="space-y-4">
                <div *ngFor="let appointment of appointments" 
                     class="border-b pb-4 last:border-b-0 last:pb-0">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-medium">{{ appointment.date | date:'long' }}</p>
                      <p class="text-gray-600">{{ appointment.address }}</p>
                    </div>
                    <span [class]="getStatusClass(appointment.status)">
                      {{ getStatusLabel(appointment.status) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: UserProfile | null = null;
  vehicles: VehicleReply[] = [];
  appointments: Appointment[] = [];
  loading = false;
  AppointmentStatus = AppointmentStatus;
  expertId: string | null = null;
  expert: any = null;
  stripeAccount: StripeAccount | null = null;
  stripeLoading = false;
  stripeError = '';
  stripeSuccess = '';

  constructor(
    private profileService: ProfileService,
    private vehicleService: VehicleService,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private expertService: ExpertService,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadVehicles();
    this.loadExpertData();
    this.loadStripeAccount();
  }

  private loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (profile) => {
        this.user = profile;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
      }
    });
  }

  private loadVehicles() {
    const userId = localStorage.getItem('auth_token');
    if (!userId) {
      console.error('Aucun ID utilisateur trouvé');
      return;
    }

    this.vehicleService.getVehiclesByUserId(userId).subscribe({
      next: (response: VehiclesReply) => {
        this.vehicles = response.getVehiclesList();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des véhicules:', error);
      }
    });
  }

  private loadExpertData(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'EXPERT') {
      this.expertService.getExpertByUserId(user.id).subscribe({
        next: (expert) => {
          this.expert = expert;
          this.expertId = (typeof expert.getId === 'function' ? expert.getId() : null) as string | null;
          if (!this.expertId) {
            console.error('Impossible de récupérer l\'id de l\'expert');
            return;
          }
          this.loadAppointmentsForExpert(this.expertId);
        },
        error: (error: any) => {
          console.error('Erreur lors de la récupération de l\'expert:', error);
        }
      });
    }
  }

  private loadAppointmentsForExpert(expertId: string): void {
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

  loadStripeAccount() {
    const userId = this.user?.id || localStorage.getItem('auth_token');
    if (!userId) return;
    this.stripeService.getStripeAccountStatus(userId).subscribe({
      next: (account) => {
        this.stripeAccount = account;
      },
      error: (error) => {
        this.stripeAccount = null;
      }
    });
  }

  createStripeAccount() {
    if (!this.user) return;
    this.stripeLoading = true;
    this.stripeError = '';
    this.stripeSuccess = '';
    this.stripeService.createStripeAccount(this.user.id, this.user.email, 'FR').subscribe({
      next: (account) => {
        this.stripeAccount = account;
        this.stripeLoading = false;
        this.stripeSuccess = "Compte Stripe créé avec succès !";
        if (account.onboardingLink) {
          window.open(account.onboardingLink, '_blank');
        }
      },
      error: (error) => {
        this.stripeLoading = false;
        this.stripeError = 'Erreur lors de la création du compte Stripe';
      }
    });
  }
} 