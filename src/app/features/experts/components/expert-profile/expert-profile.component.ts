import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExpertService, Expert } from '../../services/expert.service';
import { ExpertStripeService } from '../../services/expert-stripe.service';

@Component({
  selector: 'app-expert-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- En-tête du profil -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <i class="fas fa-user text-gray-500 text-3xl"></i>
              </div>
              <div>
                <h1 class="text-2xl font-bold">{{ expert?.firstName }} {{ expert?.lastName }}</h1>
                <p class="text-gray-600">{{ expert?.specialities?.join(', ') }}</p>
              </div>
            </div>
            <div class="flex space-x-4">
              <button (click)="editProfile()"
                      class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <i class="fas fa-edit mr-2"></i>
                Modifier
              </button>
            </div>
          </div>
        </div>

        <!-- Section Paiements -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">Configuration des Paiements</h2>
          
          <div *ngIf="loading" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>

          <div *ngIf="!loading" class="space-y-6">
            <!-- Expert non connecté à Stripe -->
            <div *ngIf="!stripeStatus.isConnected" class="text-center py-6">
              <div class="mb-4">
                <i class="fas fa-credit-card text-4xl text-gray-400"></i>
              </div>
              <h3 class="text-lg font-medium mb-2">Connectez votre compte Stripe</h3>
              <p class="text-gray-600 mb-4">
                Pour recevoir vos paiements, vous devez connecter votre compte Stripe.
              </p>
              <button (click)="connectStripe()"
                      class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <i class="fab fa-stripe mr-2"></i>
                Connecter mon compte Stripe
              </button>
            </div>

            <!-- Expert connecté à Stripe -->
            <div *ngIf="stripeStatus.isConnected" class="space-y-4">
              <!-- Statut de connexion -->
              <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div class="flex items-center">
                  <i class="fas fa-check-circle text-green-500 text-xl mr-3"></i>
                  <div>
                    <h3 class="font-semibold text-green-800">Compte Stripe connecté</h3>
                    <p class="text-sm text-green-600">Votre compte est prêt à recevoir des paiements</p>
                  </div>
                </div>
                <button (click)="disconnectStripe()"
                        class="text-red-600 hover:text-red-800">
                  Déconnecter
                </button>
              </div>

              <!-- Statut des paiements -->
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-gray-50 rounded-lg">
                  <h4 class="font-medium text-gray-900 mb-1">Paiements entrants</h4>
                  <p class="text-sm" [class]="stripeStatus.chargesEnabled ? 'text-green-600' : 'text-red-600'">
                    {{ stripeStatus.chargesEnabled ? 'Activés' : 'Désactivés' }}
                  </p>
                </div>
                <div class="p-4 bg-gray-50 rounded-lg">
                  <h4 class="font-medium text-gray-900 mb-1">Paiements sortants</h4>
                  <p class="text-sm" [class]="stripeStatus.payoutsEnabled ? 'text-green-600' : 'text-red-600'">
                    {{ stripeStatus.payoutsEnabled ? 'Activés' : 'Désactivés' }}
                  </p>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex justify-end space-x-4 pt-4">
                <button (click)="updateStripeAccount()"
                        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                  <i class="fas fa-sync-alt mr-2"></i>
                  Mettre à jour mes informations
                </button>
                <button (click)="viewPayouts()"
                        class="px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
                  <i class="fas fa-money-bill-wave mr-2"></i>
                  Voir mes paiements
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Informations -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Informations Professionnelles</h2>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Expérience</h3>
              <p class="text-gray-600">
                <i class="fas fa-graduation-cap mr-2"></i>
                {{ expert?.yearsOfExperience }} ans d'expérience
              </p>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Évaluation</h3>
              <div class="flex items-center">
                <div class="flex items-center mr-2">
                  <i class="fas fa-star text-yellow-400 mr-1"></i>
                  <span class="font-medium">{{ expert?.rating }}/5</span>
                </div>
                <span class="text-gray-600">({{ expert?.reviewCount }} avis)</span>
              </div>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Disponibilité</h3>
              <p class="text-gray-600">
                <i class="fas fa-calendar-check mr-2"></i>
                {{ expert?.isAvailable ? 'Disponible' : 'Non disponible' }}
              </p>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Tarif horaire</h3>
              <p class="text-gray-600">
                <i class="fas fa-euro-sign mr-2"></i>
                {{ expert?.hourlyRate }}€/heure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ExpertProfileComponent implements OnInit {
  expert: Expert | null = null;
  loading = false;
  stripeStatus: {
    isConnected: boolean;
    accountId?: string;
    payoutsEnabled: boolean;
    chargesEnabled: boolean;
  } = {
    isConnected: false,
    payoutsEnabled: false,
    chargesEnabled: false
  };

  constructor(
    private expertService: ExpertService,
    private expertStripeService: ExpertStripeService
  ) {}

  ngOnInit(): void {
    this.loadExpert();
    this.loadStripeStatus();
  }

  loadExpert(): void {
    // Récupérer l'ID de l'expert connecté depuis le service d'authentification
    const expertId = 'current-expert-id'; // À remplacer par l'ID réel
    this.expertService.getExpertById(expertId).subscribe({
      next: (expert: Expert) => {
        this.expert = expert;
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement du profil:', error);
      }
    });
  }

  loadStripeStatus(): void {
    this.loading = true;
    const expertId = 'current-expert-id'; // À remplacer par l'ID réel
    this.expertStripeService.getStripeAccountStatus(expertId).subscribe({
      next: (status) => {
        this.stripeStatus = status;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du statut Stripe:', error);
        this.loading = false;
      }
    });
  }

  editProfile(): void {
    // Navigation vers la page d'édition du profil
  }

  connectStripe(): void {
    if (!this.expert) return;
    this.expertStripeService.createStripeAccount(this.expert.id, this.expert.email, 'FR').subscribe({
      next: (response) => {
        if (response.onboardingLink) {
          window.location.href = response.onboardingLink;
        }
      },
      error: (error) => {
        console.error('Erreur lors de la création du compte Stripe:', error);
      }
    });
  }

  updateStripeAccount(): void {
    // À implémenter si besoin, sinon à retirer si la méthode n'existe pas dans le service
    // Par exemple, recharger le statut Stripe
    this.loadStripeStatus();
  }

  disconnectStripe(): void {
    const expertId = 'current-expert-id'; // À remplacer par l'ID réel
    this.expertStripeService.disconnectStripeAccount(expertId).subscribe({
      next: () => {
        this.loadStripeStatus();
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion du compte Stripe:', error);
      }
    });
  }

  viewPayouts(): void {
    // Navigation vers la page des paiements
  }
} 