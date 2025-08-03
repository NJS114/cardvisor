import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment, AppointmentStatus, AppointmentService } from 'src/app/core/services/appointment.service';

@Component({
  selector: 'expert-appointments-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 bg-white rounded-lg shadow mb-4">
      <h2 class="text-xl font-bold mb-4 flex items-center">🗓️ Rendez-vous de l'expert</h2>
      <div *ngIf="appointments && appointments.length > 0; else noRdv">
        <div class="mb-4 flex flex-wrap gap-2">
          <button *ngFor="let s of statusList" (click)="filterStatus = s" [class.bg-blue-200]="filterStatus === s" class="px-3 py-1 rounded border text-sm">
            {{ getStatusLabel(s) }}
          </button>
          <button (click)="filterStatus = null" [class.bg-gray-200]="!filterStatus" class="px-3 py-1 rounded border text-sm">Tous</button>
        </div>
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2">Date</th>
              <th class="p-2">Client</th>
              <th class="p-2">Véhicule</th>
              <th class="p-2">Adresse</th>
              <th class="p-2">Statut</th>
              <th class="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let a of filteredAppointments()">
              <td class="p-2">{{ a.date | date:'dd/MM/yyyy HH:mm' }}</td>
              <td class="p-2">{{ a.userId }}</td>
              <td class="p-2">{{ a.vehicleId }}</td>
              <td class="p-2">{{ a.address }}</td>
              <td class="p-2">
                <span [ngClass]="getStatusClass(a.status)" class="px-2 py-1 rounded text-xs">{{ getStatusLabel(a.status) }}</span>
              </td>
              <td class="p-2">
                <button *ngIf="a.status === AppointmentStatus.EN_ATTENTE" (click)="accepter(a)" class="text-green-600 hover:underline mr-2">Accepter</button>
                <button *ngIf="a.status === AppointmentStatus.EN_ATTENTE" (click)="refuser(a)" class="text-red-600 hover:underline">Refuser</button>
                <button (click)="voirDetail(a)" class="text-blue-600 hover:underline ml-2">Détail</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ng-template #noRdv>
        <div class="text-gray-500 text-center py-8">Aucun rendez-vous trouvé</div>
      </ng-template>
    </div>
  `,
  providers: [AppointmentService]
})
export class ExpertAppointmentsTableComponent {
  @Input() appointments: Appointment[] = [];
  @Output() refresh = new EventEmitter<void>();
  AppointmentStatus = AppointmentStatus;
  statusList = [AppointmentStatus.EN_ATTENTE, AppointmentStatus.CONFIRMÉ, AppointmentStatus.RÉALISÉ, AppointmentStatus.ANNULÉ];
  filterStatus: AppointmentStatus | null = null;

  constructor(private appointmentService: AppointmentService) {}

  filteredAppointments(): Appointment[] {
    let arr = [...this.appointments];
    if (this.filterStatus) {
      arr = arr.filter(a => a.status === this.filterStatus);
    }
    // Tri par date décroissante
    return arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getStatusLabel(status: AppointmentStatus): string {
    switch (status) {
      case AppointmentStatus.EN_ATTENTE: return 'En attente';
      case AppointmentStatus.CONFIRMÉ: return 'Confirmé';
      case AppointmentStatus.RÉALISÉ: return 'Réalisé';
      case AppointmentStatus.ANNULÉ: return 'Annulé';
      default: return status;
    }
  }
  getStatusClass(status: AppointmentStatus): string {
    switch (status) {
      case AppointmentStatus.CONFIRMÉ: return 'bg-green-100 text-green-800';
      case AppointmentStatus.ANNULÉ: return 'bg-red-100 text-red-800';
      case AppointmentStatus.RÉALISÉ: return 'bg-blue-100 text-blue-800';
      case AppointmentStatus.EN_ATTENTE: return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
  accepter(a: Appointment) {
    this.appointmentService.updateAppointmentStatus(a.id, AppointmentStatus.CONFIRMÉ).subscribe({
      next: () => {
        this.refresh.emit();
      },
      error: () => {
        alert('Erreur lors de la confirmation du rendez-vous');
      }
    });
  }
  refuser(a: Appointment) {
    this.appointmentService.updateAppointmentStatus(a.id, AppointmentStatus.ANNULÉ).subscribe({
      next: () => {
        this.refresh.emit();
      },
      error: () => {
        alert('Erreur lors de l\'annulation du rendez-vous');
      }
    });
  }
  voirDetail(a: Appointment) {
    // TODO: Naviguer ou ouvrir un modal avec le détail du rendez-vous
    alert('Détail du rendez-vous ' + a.id);
  }
} 