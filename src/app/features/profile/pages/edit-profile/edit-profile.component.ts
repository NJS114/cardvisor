import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../core/services/profile.service';

@Component({
  selector: 'app-edit-profile',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white shadow rounded-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Modifier mon Profil</h1>
          </div>

          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
                <input type="text" id="firstName" formControlName="firstName"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              </div>

              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700">Nom</label>
                <input type="text" id="lastName" formControlName="lastName"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              </div>

              <div class="sm:col-span-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" formControlName="email"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              </div>

              <div class="sm:col-span-2">
                <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
                <input type="tel" id="phone" formControlName="phone"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              </div>

              <div class="sm:col-span-2">
                <label for="address" class="block text-sm font-medium text-gray-700">Adresse</label>
                <textarea id="address" formControlName="address" rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
              </div>

              <div class="sm:col-span-2">
                <label for="currentPassword" class="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
                <input type="password" id="currentPassword" formControlName="currentPassword"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              </div>

              <div class="sm:col-span-2">
                <label for="newPassword" class="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                <input type="password" id="newPassword" formControlName="newPassword"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              </div>
            </div>

            <div class="flex justify-end space-x-4">
              <button type="button" (click)="onCancel()"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Annuler
              </button>
              <button type="submit" [disabled]="!profileForm.valid || isSubmitting"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      currentPassword: [''],
      newPassword: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (profile) => {
        this.profileForm.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone || '',
          address: profile.address || ''
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
        // TODO: Afficher un message d'erreur à l'utilisateur
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isSubmitting = true;
      const { currentPassword, newPassword, ...profileData } = this.profileForm.value;

      const updateProfile$ = this.profileService.updateProfile(profileData);
      const updatePassword$ = currentPassword && newPassword
        ? this.profileService.updatePassword(currentPassword, newPassword)
        : Promise.resolve();

      Promise.all([updateProfile$, updatePassword$])
        .then(() => {
          this.router.navigate(['/profile']);
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour du profil:', error);
          // TODO: Afficher un message d'erreur à l'utilisateur
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    }
  }

  onCancel() {
    this.router.navigate(['/profile']);
  }
} 