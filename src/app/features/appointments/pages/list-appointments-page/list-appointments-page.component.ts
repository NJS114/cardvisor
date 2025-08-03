import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentService, Appointment, AppointmentStatus } from '../../../../core/services/appointment.service';
import { ExpertService } from '../../../../core/services/expert.service';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { AppointmentReply, AppointmentsReply } from '../../../../protos/generated/appointment_pb';
import { ExpertReply } from '../../../../protos/generated/expert_pb';
import { VehicleReply } from '../../../../protos/generated/vehicle_pb';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { StripeService } from '../../../../core/services/stripe.service';

@Component({
  selector: 'app-list-appointments-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Mes Rendez-vous</h1>

        <div *ngIf="loading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>

        <div *ngIf="!loading && appointments.length === 0" class="text-center py-8">
          <p class="text-gray-500">Aucun rendez-vous trouvé</p>
        </div>

        <div *ngIf="!loading && appointments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let appointment of appointments" 
               class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <p class="font-medium">{{ appointment.date | date:'long' }}</p>
                <p class="text-gray-600">{{ appointment.address }}</p>
              </div>
              <span [class]="getStatusClass(appointment.status)">
                {{ getStatusLabel(appointment.status) }}
              </span>
            </div>
            <div class="flex justify-end space-x-4">
              <button (click)="viewAppointment(appointment.id)"
                      class="px-4 py-2 text-blue-600 hover:text-blue-800">
                Voir détails
              </button>
              <button *ngIf="canPay(appointment)" (click)="payerCheckout(appointment)"
                      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Payer avec Stripe Checkout
              </button>
              <button *ngIf="canPay(appointment)" (click)="payerDirect(appointment)"
                      class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Payer par carte intégrée
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ListAppointmentsPageComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = false;
  AppointmentStatus = AppointmentStatus;
  private expertCache: Map<string, ExpertReply> = new Map();
  private vehicleCache: Map<string, VehicleReply> = new Map();

  constructor(
    private appointmentService: AppointmentService,
    private expertService: ExpertService,
    private vehicleService: VehicleService,
    private authService: AuthService,
    private router: Router,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'USER') {
      this.appointmentService.getAppointmentsByUserId(user.id).subscribe({
        next: (appointments: Appointment[]) => {
          this.appointments = appointments;
          this.loading = false;
        },
        error: (error: Error) => {
          console.error('Erreur lors du chargement des rendez-vous:', error);
          this.loading = false;
        }
      });
    } else if (user && user.role === 'EXPERT') {
      this.appointmentService.getAppointmentsByExpertId(user.id).subscribe({
        next: (appointments: Appointment[]) => {
          this.appointments = appointments;
          this.loading = false;
        },
        error: (error: Error) => {
          console.error('Erreur lors du chargement des rendez-vous:', error);
          this.loading = false;
        }
      });
    } else {
      this.appointmentService.getAllAppointments().subscribe({
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
        return 'Réalisé';
      case AppointmentStatus.ANNULÉ:
        return 'Annulé';
      default:
        return 'Inconnu';
    }
  }

  viewAppointment(id: string): void {
    this.router.navigate(['/appointments', id]);
  }

  getExpertName(expertId: string): string {
    if (this.expertCache.has(expertId)) {
      const expert = this.expertCache.get(expertId);
      return `${expert?.getFirstName()} ${expert?.getLastName()}`;
    }

    this.expertService.getExpertById(expertId).subscribe({
      next: (expert: ExpertReply) => {
        this.expertCache.set(expertId, expert);
        return `${expert.getFirstName()} ${expert.getLastName()}`;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'expert:', error);
        return 'Expert inconnu';
      }
    });

    return 'Chargement...';
  }

  getVehicleModel(vehicleId: string): string {
    if (this.vehicleCache.has(vehicleId)) {
      const vehicle = this.vehicleCache.get(vehicleId);
      return `${vehicle?.getBrand()} ${vehicle?.getModel()}`;
    }

    this.vehicleService.getVehicleById(vehicleId).subscribe({
      next: (vehicle: VehicleReply) => {
        this.vehicleCache.set(vehicleId, vehicle);
        return `${vehicle.getBrand()} ${vehicle.getModel()}`;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du véhicule:', error);
        return 'Véhicule inconnu';
      }
    });

    return 'Chargement...';
  }

  isUserOwner(appointment: Appointment): boolean {
    const user = this.authService.getCurrentUser();
    return !!user && user.id === appointment.userId;
  }

  canPay(appointment: Appointment): boolean {
    return this.isUserOwner(appointment) && (appointment.status === AppointmentStatus.EN_ATTENTE || appointment.status === AppointmentStatus.CONFIRMÉ);
  }

  async payerCheckout(appointment: Appointment) {
    try {
      console.log('payerCheckout appelé', appointment);
      const payments = (await this.stripeService.getUserPayments(appointment.userId).toPromise()) || [];
      const payment = payments.find(p => p.appointmentId === appointment.id);
      if (!payment || !payment.amount || payment.amount < 0.5) {
        alert("Aucun paiement valide trouvé pour ce rendez-vous (ou montant < 0,50 €)");
        return;
      }
      const url = await this.stripeService.purchaseService(
        appointment.userId,
        appointment.expertId,
        payment.amount,
        'eur'
      ).toPromise();
      console.log('URL Stripe Checkout reçue:', url);
      if (!url) throw new Error('Impossible de créer la session Stripe Checkout');
      window.location.href = url;
    } catch (error) {
      console.error('Erreur payerCheckout:', error);
      alert(error instanceof Error ? error.message : 'Erreur lors du paiement Checkout');
    }
  }

  async payerDirect(appointment: Appointment) {
    try {
      // 1. Récupérer le service price de l'expert
      const expert = await this.expertService.getExpertById(appointment.expertId).toPromise();
      if (!expert) {
        alert("Impossible de récupérer l'expert pour ce rendez-vous.");
        return;
      }
      const amount = expert.getServicePrice();
      if (!amount || amount < 50) {
        alert("Montant du service invalide (< 0,50 €)");
        return;
      }
      // 2. Appeler la méthode gRPC CreatePaymentIntent
      const clientSecret = await this.stripeService.createPaymentIntent(
        appointment.userId,
        appointment.expertId,
        amount,
        'eur'
      ).toPromise();
      if (!clientSecret) throw new Error('Impossible de créer le paiement Stripe');
      // 3. Lancer le paiement Stripe côté front (Stripe.js)
      const stripe = (window as any).Stripe && (window as any).Stripe('pk_test_xxx'); // Remplace par ta clé publique Stripe
      if (!stripe) throw new Error('Stripe non initialisé');
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          // Ici tu peux ajouter billing_details, etc. si tu veux
        }
      });
      if (error) throw new Error(error.message);
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        alert('Paiement réussi !');
        // Rediriger ou afficher un message de succès
      }
    } catch (error) {
      console.error('Erreur payerDirect:', error);
      alert(error instanceof Error ? error.message : 'Erreur lors du paiement direct');
    }
  }

  getVehicleInfo(vehicleId: string): string {
    if (this.vehicleCache.has(vehicleId)) {
      const v = this.vehicleCache.get(vehicleId)!;
      return `${v.getBrand()} ${v.getModel()} (${v.getYear()})`;
    }
    this.vehicleService.getVehicleById(vehicleId).subscribe({
      next: (vehicle: VehicleReply) => {
        this.vehicleCache.set(vehicleId, vehicle);
      },
      error: () => {}
    });
    return 'Chargement...';
  }

  getPriceAnnounced(expertId: string): string {
    if (this.expertCache.has(expertId)) {
      const expert = this.expertCache.get(expertId)!;
      const price = expert.getServicePrice();
      return price ? (price).toFixed(2) + ' €' : 'Non renseigné';
    }
    this.expertService.getExpertById(expertId).subscribe({
      next: (expert: ExpertReply) => {
        this.expertCache.set(expertId, expert);
      },
      error: () => {}
    });
    return 'Chargement...';
  }
} 