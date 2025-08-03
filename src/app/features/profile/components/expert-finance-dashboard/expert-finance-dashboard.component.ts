import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment, AppointmentStatus } from 'src/app/core/services/appointment.service';

@Component({
  selector: 'expert-finance-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 bg-white rounded-lg shadow mb-4">
      <h2 class="text-xl font-bold mb-4 flex items-center">📊 Dashboard financier</h2>
      <div *ngIf="appointments">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="bg-green-50 p-4 rounded flex flex-col items-center">
            <span class="text-2xl">💶</span>
            <div class="font-bold text-lg">{{ totalGagne | number:'1.2-2' }} €</div>
            <div class="text-xs text-gray-500">Total gagné</div>
          </div>
          <div class="bg-blue-50 p-4 rounded flex flex-col items-center">
            <span class="text-2xl">📆</span>
            <div class="font-bold text-lg">{{ totalMois | number:'1.2-2' }} €</div>
            <div class="text-xs text-gray-500">Gagné ce mois-ci</div>
          </div>
          <div class="bg-yellow-50 p-4 rounded flex flex-col items-center">
            <span class="text-2xl">📈</span>
            <div class="font-bold text-lg">{{ nbRealises }}</div>
            <div class="text-xs text-gray-500">RDV réalisés</div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-purple-50 p-4 rounded flex flex-col items-center">
            <span class="text-2xl">🌟</span>
            <div class="font-bold text-lg">{{ tauxSatisfaction }}</div>
            <div class="text-xs text-gray-500">Taux de satisfaction</div>
          </div>
          <div class="bg-pink-50 p-4 rounded flex flex-col items-center">
            <span class="text-2xl">✅</span>
            <div class="font-bold text-lg">{{ tauxAcceptation }}</div>
            <div class="text-xs text-gray-500">Taux d'acceptation</div>
          </div>
          <div class="bg-orange-50 p-4 rounded flex flex-col items-center">
            <span class="text-2xl">💰</span>
            <div class="font-bold text-lg">{{ prixMoyen | number:'1.2-2' }} €</div>
            <div class="text-xs text-gray-500">Prix moyen RDV</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ExpertFinanceDashboardComponent implements OnChanges {
  @Input() appointments: Appointment[] = [];

  totalGagne = 0;
  totalMois = 0;
  nbRealises = 0;
  tauxSatisfaction = 'N/A';
  tauxAcceptation = 'N/A';
  prixMoyen = 0;

  ngOnChanges() {
    const now = new Date();
    const mois = now.getMonth();
    const annee = now.getFullYear();
    const payants = this.appointments.filter(a => a.status === AppointmentStatus.CONFIRMÉ || a.status === AppointmentStatus.RÉALISÉ);
    this.totalGagne = payants.length * 30; // Simule 30€ par RDV, à remplacer par a.payment?.amount si dispo
    this.totalMois = payants.filter(a => {
      const d = new Date(a.date);
      return d.getMonth() === mois && d.getFullYear() === annee;
    }).length * 30;
    this.nbRealises = this.appointments.filter(a => a.status === AppointmentStatus.RÉALISÉ).length;
    // Satisfaction : % réalisés ou confirmés sur total
    this.tauxSatisfaction = this.appointments.length > 0 ? Math.round((payants.length / this.appointments.length) * 100) + ' %' : 'N/A';
    // Acceptation : % confirmés sur (en attente + confirmés)
    const nbAttente = this.appointments.filter(a => a.status === AppointmentStatus.EN_ATTENTE).length;
    const nbConfirme = this.appointments.filter(a => a.status === AppointmentStatus.CONFIRMÉ).length;
    this.tauxAcceptation = (nbAttente + nbConfirme) > 0 ? Math.round((nbConfirme / (nbAttente + nbConfirme)) * 100) + ' %' : 'N/A';
    this.prixMoyen = payants.length > 0 ? 30 : 0; // Simule 30€ par RDV
  }
} 