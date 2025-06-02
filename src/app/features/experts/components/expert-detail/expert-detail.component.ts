import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpertService } from '../../../../core/services/expert.service';
import { ExpertReply } from '../../../../protos/generated/expert_pb';

@Component({
  selector: 'app-expert-detail',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <!-- En-tête -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">Profil de l'Expert</h1>
          <button (click)="goBack()"
                  class="px-4 py-2 text-gray-600 hover:text-gray-800">
            <i class="fas fa-arrow-left mr-2"></i>
            Retour
          </button>
        </div>

        <!-- Carte principale -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex items-center mb-6">
            <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mr-6">
              <i class="fas fa-user text-gray-500 text-4xl"></i>
            </div>
            <div>
              <h2 class="text-2xl font-semibold mb-2">
                {{ expert?.getFirstName() }} {{ expert?.getLastName() }}
              </h2>
              <p class="text-gray-600 text-lg">{{ expert?.getSpecialities() }}</p>
            </div>
          </div>

          <!-- Informations détaillées -->
          <div class="space-y-6">
            <!-- Expérience -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Expérience</h3>
              <p class="text-gray-600">
                <i class="fas fa-graduation-cap mr-2"></i>
                {{ expert?.getYearsOfExperience() }} ans d'expérience
              </p>
            </div>

            <!-- Évaluation -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Évaluation</h3>
              <div class="flex items-center">
                <div class="flex items-center mr-4">
                  <i class="fas fa-star text-yellow-400 mr-1"></i>
                  <span class="text-lg font-medium">{{ expert?.getRating() }}/5</span>
                </div>
                <span class="text-gray-600">({{ expert?.getReviewCount() }} avis)</span>
              </div>
            </div>

            <!-- Disponibilité -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Disponibilité</h3>
              <p class="text-gray-600">
                <i class="fas fa-calendar-check mr-2"></i>
                {{ expert?.getIsAvailable() ? 'Disponible' : 'Non disponible' }}
              </p>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-4 pt-6 border-t">
              <button (click)="bookAppointment()"
                      class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ExpertDetailComponent implements OnInit {
  expert?: ExpertReply;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expertService: ExpertService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadExpert(id);
    }
  }

  loadExpert(id: string): void {
    this.expertService.getExpertById(id).subscribe({
      next: (expert: ExpertReply) => {
        this.expert = expert;
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement de l\'expert:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/experts']);
  }

  bookAppointment(): void {
    if (this.expert) {
      this.router.navigate(['/appointments/new'], {
        queryParams: { expertId: this.expert.getId() }
      });
    }
  }
} 