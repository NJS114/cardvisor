import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { Observable, from } from 'rxjs';
import { MarketplaceServiceClient } from '../../protos/generated/MarketplaceServiceClientPb';
import * as marketplace_pb from '../../protos/generated/marketplace_pb';

export interface StripeAccount {
  id: string;
  stripeAccountId: string;
  onboardingLink?: string;
  refreshUrl?: string;
  isChargesEnabled: boolean;
  isPayoutsEnabled: boolean;
  userId: string;
  createdAt: Date;
}

export interface Payment {
  id: string;
  appointmentId: string;
  userId: string;
  expertId: string;
  paymentIntentId: string;
  amount: number;
  expertRevenue: number;
  platformFee: number;
  dividendAmount?: number;
  status: 'succeeded' | 'pending' | 'failed';
  paymentDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: Promise<Stripe | null>;
  private grpcClient: MarketplaceServiceClient;
  private marketplaceClient: MarketplaceServiceClient;

  constructor() {
    this.stripe = loadStripe(environment.stripe.publishableKey);
    this.grpcClient = new MarketplaceServiceClient('http://localhost:5257');
    this.marketplaceClient = new MarketplaceServiceClient('http://localhost:5257');
  }

  // Exposer l'instance Stripe
  async getStripe(): Promise<Stripe> {
    const stripe = await this.stripe;
    if (!stripe) {
      throw new Error('Stripe n\'est pas initialisé');
    }
    return stripe;
  }

  // Créer un compte Stripe pour un expert via gRPC
  createStripeAccount(userId: string, email: string, country: string): Observable<StripeAccount> {
    const request = new marketplace_pb.CreateStripeAccountRequest();
    request.setUserId(userId);
    request.setEmail(email);
    request.setCountry(country);
    return from(
      this.grpcClient.createStripeAccount(request).then(reply => ({
        id: reply.getStripeAccountId(),
        stripeAccountId: reply.getStripeAccountId(),
        onboardingLink: reply.getOnboardingUrl(),
        isChargesEnabled: false,
        isPayoutsEnabled: false,
        userId: userId,
        createdAt: new Date(),
      }))
    );
  }

  // Vérifier le statut du compte Stripe via gRPC
  getStripeAccountStatus(userId: string): Observable<StripeAccount> {
    const request = new marketplace_pb.GetStripeAccountStatusRequest();
    request.setUserId(userId);
    return from(
      this.grpcClient.getStripeAccountStatus(request).then(reply => ({
        id: reply.getStripeAccountId(),
        stripeAccountId: reply.getStripeAccountId(),
        onboardingLink: undefined,
        isChargesEnabled: reply.getChargesEnabled(),
        isPayoutsEnabled: reply.getPayoutsEnabled(),
        userId: userId,
        createdAt: new Date(),
      }))
    );
  }

  // Créer un paiement pour un rendez-vous
  createPayment(appointmentId: string, amount: number, expertId: string): Observable<Payment> {
    return from(fetch(`${environment.apiUrl}/marketplace/stripe/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        appointmentId,
        amount,
        expertId
      })
    }).then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la création du paiement');
      }
      return response.json();
    }));
  }

  // Confirmer un paiement avec Stripe
  async confirmPayment(clientSecret: string, paymentMethodId: string): Promise<void> {
    const stripe = await this.stripe;
    if (!stripe) {
      throw new Error('Stripe n\'est pas initialisé');
    }

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodId
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  // Obtenir l'historique des paiements d'un expert
  getExpertPayments(expertId: string): Observable<Payment[]> {
    return from(fetch(`${environment.apiUrl}/marketplace/stripe/payments/expert/${expertId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des paiements');
      }
      return response.json();
    }));
  }

  // Méthode gRPC à implémenter côté backend/proto pour récupérer les paiements utilisateur
  // Pour l'instant, retourne un tableau vide (aucun paiement)
  getUserPayments(userId: string): Observable<Payment[]> {
    // TODO: Remplacer par un appel gRPC MarketplaceService.GetUserPayments quand dispo
    return new Observable<Payment[]>(observer => {
      observer.next([]);
      observer.complete();
    });
  }

  // Rediriger vers l'onboarding Stripe Connect
  redirectToStripeOnboarding(onboardingUrl: string): void {
    window.location.href = onboardingUrl;
  }

  // Initialiser un paiement pour un rendez-vous (exemple simplifié)
  initPayment(appointment: { id: string; amount?: number; expertId: string }): Observable<string> {
    // Ici, tu devrais appeler ton backend pour créer une session Stripe Checkout et retourner l'URL
    // Pour l'exemple, on simule une URL de session
    return from(Promise.resolve('https://checkout.stripe.com/pay/session_id_exemple'));
  }

  // Générer un lien d'onboarding Stripe à la demande (en réutilisant createStripeAccount)
  generateOnboardingLink(userId: string, email: string, country: string): Observable<string> {
    const request = new marketplace_pb.CreateStripeAccountRequest();
    request.setUserId(userId);
    request.setEmail(email);
    request.setCountry(country);
    return from(
      this.grpcClient.createStripeAccount(request)
        .then((reply: any) => reply.getOnboardingUrl())
        .catch((err: any) => {
          console.error('Erreur gRPC Stripe :', err);
          throw err;
        })
    );
  }

  createCheckoutSession(appointmentId: string, amount: number, expertId: string, currency: string = 'eur'): Observable<string> {
    const request = new marketplace_pb.CheckoutSessionRequest();
    request.setExpertId(expertId);
    request.setAmount(amount);
    request.setCurrency(currency);
    // Si besoin, ajoute appointmentId dans le message proto côté backend et regénère les types
    return from(
      this.marketplaceClient.createCheckoutSession(request, null).then((reply: marketplace_pb.CheckoutSessionReply) => {
        return reply.getCheckoutUrl();
      })
    );
  }

  /**
   * Stripe Checkout (PurchaseService) : renvoie un client_secret (pas une URL)
   */
  purchaseService(buyerId: string, expertId: string, amount: number, currency: string = 'eur', serviceId?: string): Observable<string> {
    // Utilise expertId comme serviceId si non fourni
    const sid = serviceId || expertId;
    const request = new marketplace_pb.PurchaseRequest();
    request.setBuyerId(buyerId);
    request.setExpertId(expertId);
    request.setAmount(amount);
    request.setCurrency(currency);
    request.setServiceId(sid);
    return from(
      this.marketplaceClient.purchaseService(request, null).then((reply: any) => {
        console.log('Réponse PurchaseService gRPC:', reply);
        return reply.getClientSecret();
      })
    );
  }

  /**
   * Paiement direct (CreatePaymentIntent) : renvoie un client_secret
   */
  createPaymentIntent(buyerId: string, expertId: string, amount: number, currency: string = 'eur', serviceId: string = ''): Observable<string> {
    const request = new marketplace_pb.CreatePaymentIntentRequest();
    request.setBuyerId(buyerId);
    request.setExpertId(expertId);
    request.setAmount(amount);
    request.setCurrency(currency);
    request.setServiceId(serviceId);
    return from(
      this.marketplaceClient.createPaymentIntent(request, null).then((reply: any) => {
        console.log('Réponse CreatePaymentIntent gRPC:', reply);
        return reply.getClientSecret();
      })
    );
  }
} 