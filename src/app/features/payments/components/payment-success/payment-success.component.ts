import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-6 text-center">
          <!-- Icône de succès -->
          <div class="mb-6">
            <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <i class="fas fa-check text-green-600 text-3xl"></i>
            </div>
          </div>

          <!-- Message de succès -->
          <h1 class="text-2xl font-bold text-gray-900 mb-4">
            Paiement réussi !
          </h1>
          <p class="text-gray-600 mb-8">
            Votre paiement a été traité avec succès. Vous recevrez bientôt un email de confirmation.
          </p>

          <!-- Actions -->
          <div class="flex justify-center space-x-4">
            <button (click)="goToHome()"
                    class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Retour à l'accueil
            </button>
            <button (click)="viewDetails()"
                    class="px-6 py-3 text-gray-600 hover:text-gray-800">
              Voir les détails
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PaymentSuccessComponent {
  constructor(private router: Router) {}

  goToHome(): void {
    this.router.navigate(['/']);
  }

  viewDetails(): void {
    // TODO: Implémenter la navigation vers les détails du paiement
    this.router.navigate(['/payments/history']);
  }
} 