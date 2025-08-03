import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MarketplaceServiceClient } from '../../../protos/generated/MarketplaceServiceClientPb';
import * as marketplace_pb from '../../../protos/generated/marketplace_pb';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpertStripeService {
  private apiUrl = `${environment.apiUrl}/experts/stripe`;
  private grpcClient: MarketplaceServiceClient;

  constructor(private http: HttpClient) {
    this.grpcClient = new MarketplaceServiceClient('http://localhost:5257');
  }

  // Créer un compte Stripe Connect pour un expert via gRPC
  createStripeAccount(expertId: string, email: string, country: string): Observable<{ accountId: string; onboardingLink: string }> {
    const request = new marketplace_pb.CreateStripeAccountRequest();
    request.setUserId(expertId);
    request.setEmail(email);
    request.setCountry(country);
    return from(
      this.grpcClient.createStripeAccount(request).then(reply => ({
        accountId: reply.getStripeAccountId(),
        onboardingLink: reply.getOnboardingUrl()
      }))
    );
  }

  // Obtenir le statut du compte Stripe d'un expert via gRPC
  getStripeAccountStatus(expertId: string): Observable<{
    isConnected: boolean;
    accountId?: string;
    payoutsEnabled: boolean;
    chargesEnabled: boolean;
    onboardingLink?: string;
  }> {
    const request = new marketplace_pb.GetStripeAccountStatusRequest();
    request.setUserId(expertId);
    return from(
      this.grpcClient.getStripeAccountStatus(request).then(reply => ({
        isConnected: reply.getStatus() === marketplace_pb.StripeAccountStatus.ACTIVE,
        accountId: reply.getStripeAccountId(),
        payoutsEnabled: reply.getPayoutsEnabled(),
        chargesEnabled: reply.getChargesEnabled(),
        onboardingLink: reply.getStatus() !== marketplace_pb.StripeAccountStatus.ACTIVE ? undefined : undefined // à compléter si besoin
      }))
    );
  }

  // (Optionnel) Obtenir le lien d'onboarding si besoin (à adapter selon proto)
  // ...

  // Déconnecter le compte Stripe d'un expert
  disconnectStripeAccount(expertId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/disconnect`, { expertId });
  }
} 