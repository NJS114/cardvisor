import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-error',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-6 text-center">
          <!-- Icône d'erreur -->
          <div class="mb-6">
            <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <i class="fas fa-times text-red-600 text-3xl"></i>
            </div>
          </div>

          <!-- Message d'erreur -->
          <h1 class="text-2xl font-bold text-gray-900 mb-4">
            Paiement échoué
          </h1>
          <p class="text-gray-600 mb-4">
            {{ errorMessage }}
          </p>
          <p class="text-gray-500 text-sm mb-8">
            Si le problème persiste, veuillez contacter notre support.
          </p>

          <!-- Actions -->
          <div class="flex justify-center space-x-4">
            <button (click)="retryPayment()"
                    class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Réessayer
            </button>
            <button (click)="goToHome()"
                    class="px-6 py-3 text-gray-600 hover:text-gray-800">
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PaymentErrorComponent implements OnInit {
  errorMessage: string = 'Une erreur est survenue lors du traitement de votre paiement.';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer le message d'erreur depuis les paramètres de l'URL
    const error = this.route.snapshot.queryParamMap.get('error');
    if (error) {
      this.errorMessage = decodeURIComponent(error);
    }
  }

  retryPayment(): void {
    // Récupérer les paramètres du paiement depuis l'URL
    const amount = this.route.snapshot.queryParamMap.get('amount');
    const currency = this.route.snapshot.queryParamMap.get('currency');
    const expertId = this.route.snapshot.queryParamMap.get('expertId');
    const serviceId = this.route.snapshot.queryParamMap.get('serviceId');

    // Rediriger vers le formulaire de paiement avec les mêmes paramètres
    this.router.navigate(['/payments/form'], {
      queryParams: {
        amount,
        currency,
        expertId,
        serviceId
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
} 