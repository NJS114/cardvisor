import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpertService } from '../../../../core/services/expert.service';
import { GeolocationService } from '../../../../core/services/geolocation.service';
import { ProfileService } from '../../../../core/services/profile.service';
import { ExpertReply, ExpertsReply } from '../../../../protos/generated/expert_pb';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-expert-list',
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Nos Experts</h1>
      
      <!-- Filtres -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <form [formGroup]="filterForm" (ngSubmit)="applyFilters()" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Spécialité -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Spécialité</label>
            <input type="text" formControlName="speciality"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="Ex: Mécanique, Carrosserie...">
          </div>

          <!-- Note minimale -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Note minimale</label>
            <input type="number" formControlName="rating" min="0" max="5" step="0.1"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="Ex: 4.0">
          </div>

          <!-- Années d'expérience -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Années d'expérience minimum</label>
            <input type="number" formControlName="yearsOfExperience" min="0"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="Ex: 5">
          </div>

          <!-- Adresse -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
            <input type="text" formControlName="address"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="Votre adresse">
          </div>

          <div class="lg:col-span-4 flex justify-end">
            <button type="submit"
                    class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Rechercher
            </button>
          </div>
        </form>
      </div>

      <!-- Liste des experts -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let expert of filteredExperts" 
             class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center mb-4">
            <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
              <i class="fas fa-user text-gray-500 text-2xl"></i>
            </div>
            <div>
              <h2 class="text-xl font-semibold">
                {{ expert.getFirstName() }} {{ expert.getLastName() }}
              </h2>
              <p class="text-gray-600">{{ expert.getSpecialities() }}</p>
            </div>
          </div>
          
          <div class="space-y-2 mb-4">
            <p class="text-gray-600">
              <i class="fas fa-graduation-cap mr-2"></i>
              {{ expert.getYearsOfExperience() }} ans d'expérience
            </p>
            <div class="flex items-center">
              <i class="fas fa-star text-yellow-400 mr-1"></i>
              <span class="font-medium">{{ expert.getRating() }}/5</span>
              <span class="text-gray-600 ml-2">({{ expert.getReviewCount() }} avis)</span>
            </div>
            <p *ngIf="expertDistances[expert.getId()]" class="text-gray-600">
              <i class="fas fa-map-marker-alt mr-2"></i>
              À {{ expertDistances[expert.getId()] | number:'1.0-1' }} km
            </p>
          </div>
          
          <button (click)="viewDetails(expert.getId())"
                  class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Voir le profil
          </button>
        </div>
      </div>

      <!-- Message si aucun expert trouvé -->
      <div *ngIf="filteredExperts.length === 0" class="text-center py-8">
        <p class="text-gray-500">Aucun expert ne correspond à vos critères de recherche.</p>
      </div>
    </div>
  `,
  styles: []
})
export class ExpertListComponent implements OnInit {
  experts: ExpertReply[] = [];
  filteredExperts: ExpertReply[] = [];
  expertDistances: { [key: string]: number } = {};
  expertAddresses: { [key: string]: string } = {};
  filterForm: FormGroup;

  constructor(
    private expertService: ExpertService,
    private geolocationService: GeolocationService,
    private profileService: ProfileService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      speciality: [''],
      rating: [''],
      yearsOfExperience: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
    this.loadExperts();
  }

  private loadExperts(): void {
    this.expertService.getAllExperts().subscribe({
      next: (response: ExpertsReply) => {
        this.experts = response.getExpertsList();
        this.filteredExperts = [...this.experts];
        // Charger les adresses des experts
        this.loadExpertAddresses();
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement des experts:', error);
      }
    });
  }

  private loadExpertAddresses(): void {
    const addressRequests = this.experts.map(expert => {
      return this.profileService.getProfile().pipe(
        map(profile => {
          if (profile.id === expert.getUserId()) {
            this.expertAddresses[expert.getId()] = profile.address || '';
          }
          return profile;
        })
      );
    });

    forkJoin(addressRequests).subscribe({
      error: (error) => {
        console.error('Erreur lors du chargement des adresses:', error);
      }
    });
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    this.filteredExperts = this.experts.filter(expert => {
      // Filtre par spécialité
      if (filters.speciality && !expert.getSpecialities().toLowerCase().includes(filters.speciality.toLowerCase())) {
        return false;
      }

      // Filtre par note
      if (filters.rating && expert.getRating() < parseFloat(filters.rating)) {
        return false;
      }

      // Filtre par années d'expérience
      if (filters.yearsOfExperience && expert.getYearsOfExperience() < filters.yearsOfExperience) {
        return false;
      }

      // Filtre par adresse
      if (filters.address) {
        const expertAddress = this.expertAddresses[expert.getId()];
        if (!expertAddress || !expertAddress.toLowerCase().includes(filters.address.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/experts', id]);
  }
} 