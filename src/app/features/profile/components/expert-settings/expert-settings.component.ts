import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'expert-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4 bg-white rounded-lg shadow mb-4">
      <h2 class="text-xl font-bold mb-4 flex items-center">⚙️ Paramètres expert</h2>
      <div *ngIf="expert">
        <form (ngSubmit)="save()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium">Prix du service (€)</label>
            <input type="number" [(ngModel)]="servicePrice" name="servicePrice" class="border rounded px-2 py-1 w-32" />
          </div>
          <div>
            <label class="block text-sm font-medium">Spécialités</label>
            <input type="text" [(ngModel)]="specialities" name="specialities" class="border rounded px-2 py-1 w-full" />
          </div>
          <div class="flex items-center gap-2">
            <label class="block text-sm font-medium">Disponible</label>
            <input type="checkbox" [(ngModel)]="isAvailable" name="isAvailable" />
          </div>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
        </form>
        <button (click)="desactiverCompte()" class="mt-4 px-4 py-2 bg-red-600 text-white rounded">Désactiver le compte</button>
      </div>
    </div>
  `
})
export class ExpertSettingsComponent {
  @Input() expert: any = null;
  servicePrice: number = 30;
  specialities: string = '';
  isAvailable: boolean = true;

  ngOnChanges() {
    if (this.expert) {
      this.servicePrice = this.expert.servicePrice || 30;
      this.specialities = this.expert.specialities || '';
      this.isAvailable = this.expert.isAvailable !== undefined ? this.expert.isAvailable : true;
    }
  }

  save() {
    // TODO: Appeler ExpertService.updateExpert
    alert('Paramètres enregistrés (simulation) :\nPrix : ' + this.servicePrice + '\nSpécialités : ' + this.specialities + '\nDisponible : ' + this.isAvailable);
  }
  desactiverCompte() {
    // TODO: Appeler ExpertService.deleteExpert
    alert('Compte désactivé (simulation)');
  }
} 