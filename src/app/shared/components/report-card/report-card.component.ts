import { Component, Input } from '@angular/core';
import { ReportReply } from '../../../protos/generated/report_pb';

@Component({
  selector: 'app-report-card',
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              Rapport #{{ report.getId() }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ report.getCreatedAt() | date:'dd/MM/yyyy' }}
            </p>
          </div>
          <span [class]="getStatusClass()">
            {{ report.getDocumentUrl() ? 'Complet' : 'En cours' }}
          </span>
        </div>

        <div class="mt-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Résumé</p>
              <p class="text-gray-900">{{ report.getSummary() }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Valeur estimée</p>
              <p class="text-gray-900">{{ report.getEstimatedValue() }} €</p>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <p class="text-sm text-gray-500">Recommandations</p>
          <p class="text-gray-900 line-clamp-2">{{ report.getRecommendations() }}</p>
        </div>

        <div class="mt-6 flex justify-end space-x-4">
          <button *ngIf="report.getDocumentUrl()" class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            Télécharger PDF
          </button>
          <button class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            Voir détails
          </button>
        </div>
      </div>
    </div>
  `
})
export class ReportCardComponent {
  @Input() report!: ReportReply;

  getStatusClass(): string {
    const hasDocument = this.report.getDocumentUrl() !== '';
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    
    if (hasDocument) {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  }
} 