import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CertificationDoc {
  name: string;
  status: 'validé' | 'en attente' | 'refusé';
  url?: string;
}

@Component({
  selector: 'expert-certifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 bg-white rounded-lg shadow mb-4">
      <h2 class="text-xl font-bold mb-4 flex items-center">📁 Mes certifications</h2>
      <div *ngIf="expertId">
        <form (submit)="upload($event)" class="mb-4 flex items-center gap-2">
          <input type="file" (change)="onFileChange($event)" />
          <button type="submit" class="px-3 py-1 bg-blue-600 text-white rounded" [disabled]="!selectedFile">Uploader</button>
        </form>
        <div *ngIf="certifications.length > 0; else noCert">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-2">Nom</th>
                <th class="p-2">Statut</th>
                <th class="p-2">Aperçu</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let doc of certifications">
                <td class="p-2">{{ doc.name }}</td>
                <td class="p-2">
                  <span [ngClass]="getBadgeClass(doc.status)" class="px-2 py-1 rounded text-xs">{{ doc.status }}</span>
                </td>
                <td class="p-2">
                  <a *ngIf="doc.url" [href]="doc.url" target="_blank" class="text-blue-600 underline">Voir</a>
                  <span *ngIf="!doc.url">-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ng-template #noCert>
          <div class="text-gray-500 text-center py-8">Aucun document déposé</div>
        </ng-template>
      </div>
    </div>
  `
})
export class ExpertCertificationsComponent {
  @Input() expertId: string | null = null;
  certifications: CertificationDoc[] = [
    { name: 'Diplôme Mécanique.pdf', status: 'validé', url: '#' },
    { name: 'Attestation sécurité.pdf', status: 'en attente' }
  ];
  selectedFile: File | null = null;

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }
  upload(event: Event) {
    event.preventDefault();
    if (this.selectedFile) {
      // TODO: Appeler CertificationService.uploadCertification(this.expertId, this.selectedFile)
      alert('Fichier uploadé (simulation): ' + this.selectedFile.name);
      this.certifications.push({ name: this.selectedFile.name, status: 'en attente' });
      this.selectedFile = null;
    }
  }
  getBadgeClass(status: string) {
    switch (status) {
      case 'validé': return 'bg-green-100 text-green-800';
      case 'en attente': return 'bg-yellow-100 text-yellow-800';
      case 'refusé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
} 