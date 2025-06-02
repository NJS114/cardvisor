import { Component, Input } from '@angular/core';
import { ExpertReply } from '../../../protos/generated/expert_pb';

@Component({
  selector: 'app-expert-card',
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6">
        <div class="flex items-center">

          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900">{{ expert.getFirstName() }} {{ expert.getLastName() }}</h3>
            <p class="text-sm text-gray-500">{{ expert.getSpecialities() }}</p>
          </div>
        </div>
        
     

        <div class="mt-4 flex items-center">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="ml-1 text-sm text-gray-600">{{ expert.getRating() }}/5</span>
          </div>
          <span class="ml-4 text-sm text-gray-500">{{ expert.getYearsOfExperience() }} ans d'expérience</span>
        </div>

        <div class="mt-6">
          <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Prendre rendez-vous
          </button>
        </div>
      </div>
    </div>
  `
})
export class ExpertCardComponent {
  @Input() expert!: ExpertReply;
} 