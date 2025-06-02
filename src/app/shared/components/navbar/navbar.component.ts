import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <a routerLink="/" class="text-xl font-bold text-gray-800">CarAdvisors</a>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a routerLink="/home" routerLinkActive="border-indigo-500" 
                 class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Accueil
              </a>
              <a routerLink="/experts" routerLinkActive="border-indigo-500" 
                 class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Experts
              </a>
              <a routerLink="/appointments" routerLinkActive="border-indigo-500" 
                 class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Rendez-vous
              </a>
              <a routerLink="/reports" routerLinkActive="border-indigo-500" 
                 class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Rapports
              </a>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <ng-container *ngIf="authService.isAuthenticated$ | async; else authButtons">
              <a routerLink="/profile" 
                 class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Profil
              </a>
              <button (click)="logout()" 
                      class="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Déconnexion
              </button>
            </ng-container>
            <ng-template #authButtons>
              <a routerLink="/auth/login" 
                 class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Connexion
              </a>
              <a routerLink="/auth/register" 
                 class="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Inscription
              </a>
            </ng-template>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
} 