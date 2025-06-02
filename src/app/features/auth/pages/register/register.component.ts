import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créer un compte
          </h2>
        </div>
        <form class="mt-8 space-y-6" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <input id="firstName" name="firstName" type="text" formControlName="firstName"
                placeholder="Prénom"
                class="input" />
            </div>
            <div>
              <input id="lastName" name="lastName" type="text" formControlName="lastName"
                placeholder="Nom"
                class="input" />
            </div>
            <div>
              <input id="email" name="email" type="email" formControlName="email"
                placeholder="Email"
                class="input" />
            </div>
            <div>
              <input id="password" name="password" type="password" formControlName="password"
                placeholder="Mot de passe"
                class="input" />
            </div>
            <div>
              <input id="phone" name="phone" type="text" formControlName="phone"
                placeholder="Téléphone"
                class="input" />
            </div>
            <div>
              <input id="address" name="address" type="text" formControlName="address"
                placeholder="Adresse"
                class="input" />
            </div>
            <div>
              <select id="role" formControlName="role" class="input">
                <option value="USER">Utilisateur</option>
                <option value="EXPERT">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <button type="submit" [disabled]="registerForm.invalid"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .input {
      appearance: none;
      border-radius: 0.375rem;
      display: block;
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      color: #1f2937;
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''],
      address: [''],
      role: ['USER', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password, phone, address, role } = this.registerForm.value;

      this.authService.register(firstName, lastName, email, password, role, phone, address).subscribe({
        next: () => this.router.navigate(['/auth/login']),
        error: (err) => console.error("Erreur lors de l'inscription", err)
      });
    }
  }
}
