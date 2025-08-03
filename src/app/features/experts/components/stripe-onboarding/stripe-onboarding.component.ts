import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService, StripeAccount } from '../../../../core/services/stripe.service';

@Component({
  selector: 'app-stripe-onboarding',
  template: `
    <div class="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 border border-gray-100">
      <div class="flex items-center gap-3 mb-2">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="8" fill="#635BFF"/>
          <path d="M25.5 19.5C25.5 17.0147 23.4853 15 21 15H15V27H21C23.4853 27 25.5 24.9853 25.5 22.5V19.5Z" fill="white"/>
        </svg>
        <h2 class="text-2xl font-bold text-gray-900">Compte Stripe</h2>
      </div>

      <!-- Statut du compte -->
      <div class="w-full">
        <div class="flex items-center gap-2 mb-2">
          <span [class]="getStatusClass() + ' px-3 py-1 rounded-full text-sm font-semibold'">
            {{ getStatusMessage() }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="w-full flex flex-col gap-3 mt-2">
        <button *ngIf="canSetupAccount()"
                (click)="setupStripeAccount()"
                [disabled]="loading"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold shadow">
          <span *ngIf="!loading">Créer mon compte Stripe</span>
          <span *ngIf="loading">Création en cours...</span>
        </button>

        <button *ngIf="canCompleteOnboarding()"
                (click)="completeOnboarding()"
                class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 font-semibold shadow">
          Compléter la configuration Stripe
        </button>
      </div>

      <div *ngIf="accountStatus === 'ACTIVE'" class="w-full text-center mt-2">
        <span class="inline-flex items-center gap-2 text-green-700 font-semibold">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          Compte Stripe actif et prêt à recevoir des paiements !
        </span>
      </div>
      <div *ngIf="accountStatus === 'REJECTED'" class="w-full text-center mt-2">
        <span class="inline-flex items-center gap-2 text-red-700 font-semibold">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          Compte Stripe rejeté. Veuillez réessayer.
        </span>
      </div>
    </div>
  `
})
export class StripeOnboardingComponent implements OnInit {
  @Input() userId?: string;
  @Input() email?: string;
  accountStatus: 'UNKNOWN' | 'PENDING' | 'ACTIVE' | 'REJECTED' = 'UNKNOWN';
  onboardingUrl?: string;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    const userId = this.userId || this.route.snapshot.paramMap.get('userId');
    if (userId) {
      this.checkAccountStatus(userId);
    }
  }

  private checkAccountStatus(userId: string): void {
    this.stripeService.getStripeAccountStatus(userId).subscribe({
      next: (response: StripeAccount) => {
        this.accountStatus = response.isChargesEnabled && response.isPayoutsEnabled ? 'ACTIVE' : 'PENDING';
        this.onboardingUrl = response.onboardingLink;
      },
      error: (error) => {
        console.error('Erreur lors de la vérification du compte:', error);
        this.accountStatus = 'UNKNOWN';
      }
    });
  }

  setupStripeAccount(): void {
    const userId = this.userId || this.route.snapshot.paramMap.get('userId');
    const email = this.email || this.route.snapshot.queryParamMap.get('email');
    if (!userId || !email) {
      console.error('ID utilisateur ou email manquant');
      return;
    }
    this.loading = true;
    this.stripeService.createStripeAccount(userId, email, 'FR').subscribe({
      next: (response: StripeAccount) => {
        this.accountStatus = 'PENDING';
        this.onboardingUrl = response.onboardingLink;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la création du compte:', error);
        this.loading = false;
      }
    });
  }

  completeOnboarding(): void {
    if (this.onboardingUrl) {
      window.location.href = this.onboardingUrl;
    }
  }

  canSetupAccount(): boolean {
    return this.accountStatus === 'UNKNOWN' || this.accountStatus === 'REJECTED';
  }

  canCompleteOnboarding(): boolean {
    return this.accountStatus === 'PENDING' && !!this.onboardingUrl;
  }

  getStatusClass(): string {
    switch (this.accountStatus) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusMessage(): string {
    switch (this.accountStatus) {
      case 'ACTIVE':
        return 'Votre compte Stripe est actif et prêt à recevoir des paiements.';
      case 'PENDING':
        return 'Votre compte est en attente de configuration.';
      case 'REJECTED':
        return 'Votre compte a été rejeté. Veuillez réessayer.';
      default:
        return 'Aucun compte Stripe n\'a été configuré.';
    }
  }
} 