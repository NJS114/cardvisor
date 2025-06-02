import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { AddressAutocompleteComponent } from '../../../../shared/components/address-autocomplete/address-autocomplete.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AddressAutocompleteComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créer un compte
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Ou
            <a routerLink="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              connectez-vous à votre compte existant
            </a>
          </p>
        </div>

        <!-- Indicateur de progression -->
        <div class="flex justify-between mb-8">
          <div *ngFor="let step of steps; let i = index" 
               class="flex items-center">
            <div [class]="'w-8 h-8 rounded-full flex items-center justify-center ' + 
                        (currentStep >= i ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600')">
              {{i + 1}}
            </div>
            <div *ngIf="i < steps.length - 1" 
                 [class]="'w-16 h-1 ' + (currentStep > i ? 'bg-indigo-600' : 'bg-gray-200')">
            </div>
          </div>
        </div>

        <form class="mt-8 space-y-6" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <!-- Étape 1: Type de compte -->
          <div *ngIf="currentStep === 0" class="space-y-6">
            <h3 class="text-lg font-medium text-gray-900 text-center mb-6">Choisissez votre type de compte</h3>
            <div class="grid grid-cols-2 gap-4">
              <div (click)="selectRole('USER')" 
                   [class]="'p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ' + 
                           (registerForm.get('role')?.value === 'USER' ? 
                           'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-400')">
                <div class="text-center">
                  <svg class="mx-auto h-12 w-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h4 class="mt-4 text-lg font-medium text-gray-900">Particulier</h4>
                  <p class="mt-2 text-sm text-gray-500">Pour les propriétaires de véhicules</p>
                </div>
              </div>
              <div (click)="selectRole('EXPERT')" 
                   [class]="'p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ' + 
                           (registerForm.get('role')?.value === 'EXPERT' ? 
                           'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-400')">
                <div class="text-center">
                  <svg class="mx-auto h-12 w-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h4 class="mt-4 text-lg font-medium text-gray-900">Expert</h4>
                  <p class="mt-2 text-sm text-gray-500">Pour les professionnels de l'automobile</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Étape 2: Informations personnelles -->
          <div *ngIf="currentStep === 1" class="space-y-6">
            <h3 class="text-lg font-medium text-gray-900 text-center mb-6">Vos informations personnelles</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
                <input id="firstName" name="firstName" type="text" formControlName="firstName"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <div *ngIf="registerForm.get('firstName')?.touched && registerForm.get('firstName')?.errors" 
                     class="text-red-500 text-xs mt-1">
                  <div *ngIf="registerForm.get('firstName')?.errors?.['required']">Le prénom est requis</div>
                </div>
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700">Nom</label>
                <input id="lastName" name="lastName" type="text" formControlName="lastName"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <div *ngIf="registerForm.get('lastName')?.touched && registerForm.get('lastName')?.errors" 
                     class="text-red-500 text-xs mt-1">
                  <div *ngIf="registerForm.get('lastName')?.errors?.['required']">Le nom est requis</div>
                </div>
              </div>
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input id="email" name="email" type="email" formControlName="email"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <div *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.errors" 
                   class="text-red-500 text-xs mt-1">
                <div *ngIf="registerForm.get('email')?.errors?.['required']">L'email est requis</div>
                <div *ngIf="registerForm.get('email')?.errors?.['email']">Format d'email invalide</div>
              </div>
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
              <input id="phone" name="phone" type="tel" formControlName="phone"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <div *ngIf="registerForm.get('phone')?.touched && registerForm.get('phone')?.errors" 
                   class="text-red-500 text-xs mt-1">
                <div *ngIf="registerForm.get('phone')?.errors?.['required']">Le téléphone est requis</div>
                <div *ngIf="registerForm.get('phone')?.errors?.['pattern']">Format de téléphone invalide</div>
              </div>
            </div>
          </div>

          <!-- Étape 3: Informations supplémentaires -->
          <div *ngIf="currentStep === 2" class="space-y-6">
            <h3 class="text-lg font-medium text-gray-900 text-center mb-6">
              {{ registerForm.get('role')?.value === 'EXPERT' ? 'Vos informations professionnelles' : 'Vos informations supplémentaires' }}
            </h3>
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700">Adresse</label>
              <app-address-autocomplete
                (addressSelected)="onAddressSelected($event)"
                class="mt-1">
              </app-address-autocomplete>
              <div *ngIf="registerForm.get('address')?.touched && registerForm.get('address')?.errors" 
                   class="text-red-500 text-xs mt-1">
                <div *ngIf="registerForm.get('address')?.errors?.['required']">L'adresse est requise</div>
              </div>
            </div>

            <ng-container *ngIf="registerForm.get('role')?.value === 'EXPERT'">
              <div>
                <label for="specialities" class="block text-sm font-medium text-gray-700">Spécialités</label>
                <input id="specialities" name="specialities" type="text" formControlName="specialities"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                       placeholder="Vos spécialités (séparées par des virgules)">
              </div>
              <div>
                <label for="certifications" class="block text-sm font-medium text-gray-700">Certifications</label>
                <input id="certifications" name="certifications" type="text" formControlName="certifications"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                       placeholder="Vos certifications (séparées par des virgules)">
              </div>
              <div>
                <label for="yearsOfExperience" class="block text-sm font-medium text-gray-700">Années d'expérience</label>
                <input id="yearsOfExperience" name="yearsOfExperience" type="number" formControlName="yearsOfExperience"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                       min="0"
                       placeholder="Nombre d'années d'expérience">
                <div *ngIf="registerForm.get('yearsOfExperience')?.touched && registerForm.get('yearsOfExperience')?.errors" 
                     class="text-red-500 text-xs mt-1">
                  <div *ngIf="registerForm.get('yearsOfExperience')?.errors?.['min']">Le nombre d'années doit être positif</div>
                </div>
              </div>
            </ng-container>
          </div>

          <!-- Étape 4: Sécurité -->
          <div *ngIf="currentStep === 3" class="space-y-6">
            <h3 class="text-lg font-medium text-gray-900 text-center mb-6">Sécurisez votre compte</h3>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
              <input id="password" name="password" type="password" formControlName="password"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <div *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.errors" 
                   class="text-red-500 text-xs mt-1">
                <div *ngIf="registerForm.get('password')?.errors?.['required']">Le mot de passe est requis</div>
                <div *ngIf="registerForm.get('password')?.errors?.['minlength']">Le mot de passe doit contenir au moins 6 caractères</div>
              </div>
            </div>
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
              <input id="confirmPassword" name="confirmPassword" type="password" formControlName="confirmPassword"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <div *ngIf="registerForm.get('confirmPassword')?.touched && registerForm.get('confirmPassword')?.errors" 
                   class="text-red-500 text-xs mt-1">
                <div *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">La confirmation du mot de passe est requise</div>
                <div *ngIf="registerForm.get('confirmPassword')?.errors?.['passwordMismatch']">Les mots de passe ne correspondent pas</div>
              </div>
            </div>
          </div>

          <!-- Navigation entre les étapes -->
          <div class="flex justify-between mt-8">
            <button type="button" *ngIf="currentStep > 0"
                    (click)="previousStep()"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Précédent
            </button>
            <button type="button" *ngIf="currentStep < steps.length - 1"
                    (click)="nextStep()"
                    [disabled]="!isStepValid()"
                    class="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              Suivant
            </button>
            <button type="submit" *ngIf="currentStep === steps.length - 1"
                    [disabled]="!registerForm.valid"
                    class="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              Créer mon compte
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  currentStep = 0;
  steps = ['Type de compte', 'Informations personnelles', 'Informations supplémentaires', 'Sécurité'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['USER'],
      specialities: [''],
      certifications: [''],
      yearsOfExperience: [0, [Validators.min(0)]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    }
  }

  selectRole(role: string) {
    this.registerForm.patchValue({ role });
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.registerForm.get('role')?.value !== null;
      case 1:
        const firstName = this.registerForm.get('firstName');
        const lastName = this.registerForm.get('lastName');
        const email = this.registerForm.get('email');
        const phone = this.registerForm.get('phone');
        return !!(firstName?.valid && lastName?.valid && email?.valid && phone?.valid);
      case 2:
        const address = this.registerForm.get('address');
        const role = this.registerForm.get('role');
        const specialities = this.registerForm.get('specialities');
        const certifications = this.registerForm.get('certifications');
        return !!(address?.valid && 
                 (role?.value !== 'EXPERT' || 
                  (specialities?.valid && certifications?.valid)));
      case 3:
        const password = this.registerForm.get('password');
        const confirmPassword = this.registerForm.get('confirmPassword');
        return !!(password?.valid && confirmPassword?.valid);
      default:
        return false;
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password, role, phone, address, specialities, certifications, yearsOfExperience } = this.registerForm.value;
      
      this.authService.register(
        firstName,
        lastName,
        email,
        password,
        role,
        phone,
        address,
        role === 'EXPERT' ? specialities : undefined,
        role === 'EXPERT' ? certifications : undefined,
        role === 'EXPERT' ? yearsOfExperience : undefined
      ).subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.error('Erreur d\'inscription:', error);
          // Gérer l'erreur (afficher un message, etc.)
        }
      });
    }
  }

  onAddressSelected(address: any) {
    this.registerForm.patchValue({
      address: address.fullAddress
    });
  }
} 