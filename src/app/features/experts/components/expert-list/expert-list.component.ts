import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpertService } from 'src/app/core/services/expert.service';
import { ExpertReply as Expert } from 'src/app/protos/generated/expert_pb';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expert-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto py-8">
      <div class="flex flex-col md:flex-row md:items-center mb-6 gap-4">
        <input type="text" [(ngModel)]="search" placeholder="Rechercher un expert, une spécialité..." class="input border px-3 py-2 rounded w-full md:w-96" />
        <select [(ngModel)]="filterDisponibilite" class="input border px-3 py-2 rounded">
          <option value="">Disponibilité</option>
          <option value="1">Disponible</option>
          <option value="0">Indisponible</option>
        </select>
        <select [(ngModel)]="filterSpeciality" class="input border px-3 py-2 rounded">
          <option value="">Spécialité</option>
          <option *ngFor="let s of specialities" [value]="s">{{ s }}</option>
        </select>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let expert of filteredExperts(); let i = index"
             [@fadeInStagger]="i"
             class="card-expert group hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg bg-white overflow-hidden">
          <div class="p-4 flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <img [src]="defaultPhoto" class="w-16 h-16 rounded-full object-cover border" />
              <div>
                <div class="font-bold text-lg">{{ expert.getFirstName() }} {{ expert.getLastName() }}</div>
                <div class="text-blue-600 text-sm">{{ expert.getSpecialities() }}</div>
                <div class="flex items-center gap-1 text-yellow-500">
                  <ng-container *ngFor="let s of getStars(expert.getRating())">★</ng-container>
                  <span class="text-xs text-gray-500 ml-1">({{ expert.getReviewCount() }} avis)</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <span class="badge" [ngClass]="expert.getIsAvailable() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                {{ expert.getIsAvailable() ? 'Disponible' : 'Indisponible' }}
              </span>
              <span class="badge bg-gray-100 text-gray-800">{{ expert.getYearsOfExperience() }} ans exp.</span>
              <span class="badge bg-blue-100 text-blue-800">{{ expert.getServicePrice() }} €/h</span>
            </div>
            <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    (click)="voirProfil(expert)">
              Voir le profil
            </button>
          </div>
        </div>
      </div>
      <div *ngIf="filteredExperts().length === 0" class="text-center text-gray-500 py-8">Aucun expert ne correspond à vos critères.</div>
    </div>
  `,
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms cubic-bezier(.35,0,.25,1)', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]
})
export class ExpertListComponent implements OnInit {
  experts: Expert[] = [];
  search = '';
  filterDisponibilite: string = '';
  filterSpeciality: string = '';
  specialities: string[] = [];
  defaultPhoto = 'https://ui-avatars.com/api/?name=Expert&background=0D8ABC&color=fff';

  constructor(private expertService: ExpertService, private router: Router) {}

  ngOnInit(): void {
    this.expertService.getAllExperts().subscribe({
      next: (res: any) => {
        const list = res.getExpertsList ? res.getExpertsList() : [];
        this.experts = list;
        this.specialities = Array.from(new Set(list.map((e: Expert) => e.getSpecialities()).join(',').split(',').map((s: string) => s.trim()).filter(Boolean)));
      }
    });
  }

  filteredExperts(): Expert[] {
    return this.experts.filter((e: Expert) => {
      const specialitiesStr = e.getSpecialities ? e.getSpecialities() : '';
      const matchSearch = this.search ? (
        (e.getFirstName() + ' ' + e.getLastName()).toLowerCase().includes(this.search.toLowerCase()) ||
        specialitiesStr.toLowerCase().includes(this.search.toLowerCase())
      ) : true;
      const matchDispo = this.filterDisponibilite !== '' ? (e.getIsAvailable()?.toString() === this.filterDisponibilite) : true;
      const matchSpec = this.filterSpeciality ? specialitiesStr.toLowerCase().includes(this.filterSpeciality.toLowerCase()) : true;
      return matchSearch && matchDispo && matchSpec;
    });
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating || 0)).fill(0);
  }

  voirProfil(expert: Expert) {
    this.router.navigate(['/experts', expert.getId()]);
  }
} 