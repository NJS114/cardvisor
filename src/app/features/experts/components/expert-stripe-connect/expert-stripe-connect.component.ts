import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertStripeService } from '../../services/expert-stripe.service';
import { ActivatedRoute } from '@angular/router';
import { ExpertService, Expert } from '../../services/expert.service';

@Component({
  selector: 'app-expert-stripe-connect',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h1 class="text-2xl font-bold mb-6">Configuration des Paiements</h1>

          <!-- État de la connexion -->
          <div *ngIf="loading" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>

          <div *ngIf="!loading" class="space-y-6">
            <!-- Expert non connecté -->
            <div *ngIf="!stripeStatus.isConnected" class="text-center py-8">
              <div class="mb-4">
                <i class="fas fa-credit-card text-4xl text-gray-400"></i>
              </div>
              <h2 class="text-xl font-semibold mb-2">Connectez votre compte Stripe</h2>
              <p class="text-gray-600 mb-6">
                Pour recevoir vos paiements, vous devez connecter votre compte Stripe.
              </p>
              <button (click)="connectStripe()"
                      class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Connecter mon compte Stripe
              </button>
            </div>

            <!-- Expert connecté -->
            <div *ngIf="stripeStatus.isConnected" class="space-y-4">
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

              <!-- Mettre à jour les informations -->
              <div class="text-center pt-4">
                <button (click)="updateStripeAccount()"
                        class="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                  Mettre à jour mes informations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ExpertStripeConnectComponent implements OnInit {
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
  expert: Expert | null = null;

  constructor(
    private expertStripeService: ExpertStripeService,
    private expertService: ExpertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadExpert();
    this.loadStripeStatus();
  }

  loadExpert(): void {
    const expertId = this.route.snapshot.paramMap.get('id');
    if (expertId) {
      this.expertService.getExpertById(expertId).subscribe({
        next: (expert) => {
          this.expert = expert;
        },
        error: (error) => {
          console.error('Erreur lors du chargement de l\'expert:', error);
        }
      });
    }
  }

  loadStripeStatus(): void {
    this.loading = true;
    const expertId = this.route.snapshot.paramMap.get('id');
    if (expertId) {
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
  }

  connectStripe(): void {
    const expertId = this.route.snapshot.paramMap.get('id');
    if (expertId && this.expert) {
      this.expertStripeService.createStripeAccount(expertId, this.expert.email, 'FR').subscribe({
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
  }

  updateStripeAccount(): void {
    // À implémenter si besoin, sinon à retirer si la méthode n'existe pas dans le service
    this.loadStripeStatus();
  }

  disconnectStripe(): void {
    const expertId = this.route.snapshot.paramMap.get('id');
    if (expertId) {
      this.expertStripeService.disconnectStripeAccount(expertId).subscribe({
        next: () => {
          this.loadStripeStatus();
        },
        error: (error) => {
          console.error('Erreur lors de la déconnexion du compte Stripe:', error);
        }
      });
    }
  }
} 