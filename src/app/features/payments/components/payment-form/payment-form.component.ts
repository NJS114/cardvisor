import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService, Payment } from '../../../../core/services/stripe.service';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { loadStripe, Stripe, StripeElements, StripeCardElement, StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-payment-form',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-6">Paiement</h2>

        <!-- Détails du rendez-vous -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Détails du rendez-vous</h3>
          <div class="bg-gray-50 p-4 rounded">
            <p><strong>Date:</strong> {{ appointment?.date | date:'long' }}</p>
            <p><strong>Adresse:</strong> {{ appointment?.address }}</p>
            <p><strong>Montant:</strong> {{ amount | currency:'EUR' }}</p>
          </div>
        </div>

        <!-- Formulaire de paiement -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Informations de paiement</h3>
          <div id="card-element" class="p-3 border rounded"></div>
          <div id="card-errors" class="text-red-500 mt-2" role="alert">{{ errorMessage }}</div>
        </div>

        <!-- Boutons de paiement -->
        <div class="flex flex-col gap-4">
          <button (click)="handleCheckoutPayment()"
                  [disabled]="loading"
                  class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50">
            <span *ngIf="!loading">Payer avec Stripe Checkout</span>
            <span *ngIf="loading && paymentMode === 'checkout'">Traitement en cours...</span>
          </button>
          <button (click)="handleDirectPayment()"
                  [disabled]="loading"
                  class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50">
            <span *ngIf="!loading">Payer par carte intégrée</span>
            <span *ngIf="loading && paymentMode === 'direct'">Traitement en cours...</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class PaymentFormComponent implements OnInit {
  appointment: any;
  amount: number = 0;
  payment: Payment | null = null;
  loading: boolean = false;
  paymentMode: 'checkout' | 'direct' | null = null;
  errorMessage: string = '';
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private cardElement: StripeCardElement | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stripeService: StripeService,
    private appointmentService: AppointmentService
  ) {}

  async ngOnInit() {
    // Initialiser Stripe
    this.stripe = await loadStripe(environment.stripe.publishableKey);
    if (!this.stripe) {
      throw new Error('Stripe n\'est pas initialisé');
    }

    // Récupérer les paramètres de l'URL
    const appointmentId = this.route.snapshot.queryParamMap.get('appointmentId');
    if (!appointmentId) {
      this.router.navigate(['/']);
      return;
    }

    // Charger les détails du rendez-vous
    this.appointmentService.getAppointmentById(appointmentId).subscribe({
      next: (appointment) => {
        this.appointment = appointment;
        // Charger le paiement lié à ce rendez-vous
        this.stripeService.getUserPayments(appointment.userId).subscribe({
          next: (payments) => {
            // On cherche le paiement lié à ce rendez-vous
            const payment = payments.find(p => p.appointmentId === appointment.id);
            if (payment) {
              this.payment = payment;
              this.amount = payment.amount;
              if (!this.amount || this.amount < 50) {
                this.errorMessage = "Le montant du paiement est invalide (doit être au moins 0,50 €).";
              }
            } else {
              this.errorMessage = "Aucun paiement trouvé pour ce rendez-vous.";
            }
            this.initializeCardElement();
          },
          error: (error) => {
            this.errorMessage = "Erreur lors du chargement du paiement.";
            this.initializeCardElement();
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement du rendez-vous:', error);
        this.router.navigate(['/']);
      }
    });
  }

  private initializeCardElement() {
    if (!this.stripe) return;

    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    });

    this.cardElement.mount('#card-element');
    this.cardElement.on('change', (event: StripeCardElementChangeEvent) => {
      const displayError = document.getElementById('card-errors');
      if (displayError) {
        displayError.textContent = event.error ? event.error.message : '';
      }
    });
  }

  async handleCheckoutPayment() {
    if (!this.appointment || !this.payment || !this.amount || this.amount < 50) {
      this.errorMessage = "Le montant du paiement est invalide (doit être au moins 0,50 €).";
      return;
    }
    this.loading = true;
    this.paymentMode = 'checkout';
    try {
      // Paiement Stripe Checkout (PurchaseService)
      const url = await this.stripeService.purchaseService(
        this.appointment.userId,
        this.appointment.expertId,
        this.amount,
        'eur'
      ).toPromise();
      if (!url) throw new Error('Impossible de créer la session Stripe Checkout');
      window.location.href = url;
    } catch (error) {
      const displayError = document.getElementById('card-errors');
      if (displayError) {
        displayError.textContent = error instanceof Error ? error.message : 'Une erreur est survenue';
      }
    } finally {
      this.loading = false;
      this.paymentMode = null;
    }
  }

  async handleDirectPayment() {
    if (!this.stripe || !this.cardElement || !this.appointment || !this.payment || !this.amount || this.amount < 50) {
      this.errorMessage = "Le montant du paiement est invalide (doit être au moins 0,50 €).";
      return;
    }
    this.loading = true;
    this.paymentMode = 'direct';
    try {
      // Paiement direct (CreatePaymentIntent)
      const clientSecret = await this.stripeService.createPaymentIntent(
        this.appointment.userId,
        this.appointment.expertId,
        this.amount,
        'eur'
      ).toPromise();
      if (!clientSecret) throw new Error('Impossible de créer le paiement');
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: this.cardElement,
            billing_details: {
              name: 'Client', // À remplacer par le vrai nom
            },
          },
        }
      );
      if (error) throw new Error(error.message);
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        this.router.navigate(['/payments/success'], {
          queryParams: { appointmentId: this.appointment.id }
        });
      } else {
        throw new Error('Le paiement n\'a pas été complété');
      }
    } catch (error) {
      const displayError = document.getElementById('card-errors');
      if (displayError) {
        displayError.textContent = error instanceof Error ? error.message : 'Une erreur est survenue';
      }
    } finally {
      this.loading = false;
      this.paymentMode = null;
    }
  }
} 