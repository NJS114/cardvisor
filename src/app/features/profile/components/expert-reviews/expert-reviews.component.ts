import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

@Component({
  selector: 'expert-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 bg-white rounded-lg shadow mb-4">
      <h2 class="text-xl font-bold mb-4 flex items-center">⭐ Avis & évaluations</h2>
      <div *ngIf="expertId">
        <div class="flex items-center gap-4 mb-2">
          <span class="text-2xl">{{ moyenne | number:'1.1-2' }}</span>
          <span class="flex text-yellow-400 text-xl">
            <ng-container *ngFor="let s of stars">★</ng-container>
          </span>
          <span class="text-gray-500">({{ reviews.length }} avis)</span>
        </div>
        <button (click)="partager()" class="mb-4 px-3 py-1 bg-blue-50 text-blue-700 rounded">Partager mon profil</button>
        <div *ngIf="reviews.length > 0; else noReview">
          <ul>
            <li *ngFor="let r of reviews" class="border-b py-2">
              <div class="flex items-center gap-2">
                <span class="font-bold">{{ r.author }}</span>
                <span class="text-yellow-400">{{ '★'.repeat(r.rating) }}</span>
                <span class="text-xs text-gray-400">{{ r.date }}</span>
              </div>
              <div class="text-gray-700">{{ r.comment }}</div>
            </li>
          </ul>
        </div>
        <ng-template #noReview>
          <div class="text-gray-500 text-center py-8">Aucun avis pour le moment</div>
        </ng-template>
      </div>
    </div>
  `
})
export class ExpertReviewsComponent {
  @Input() expertId: string | null = null;
  reviews: Review[] = [
    { author: 'Alice', rating: 5, comment: 'Super expertise, très pro !', date: '2024-06-01' },
    { author: 'Bob', rating: 4, comment: 'Bon contact, efficace.', date: '2024-05-20' }
  ];
  get moyenne(): number {
    if (!this.reviews.length) return 0;
    return this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length;
  }
  get stars(): number[] {
    return Array(Math.round(this.moyenne)).fill(0);
  }
  partager() {
    // TODO: Générer une vraie URL de partage (LinkedIn, etc.)
    alert('Lien de partage copié (simulation) : https://caradvisors.app/experts/' + this.expertId);
  }
} 