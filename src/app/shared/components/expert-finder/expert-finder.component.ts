import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expert-finder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="expert-finder">
      <div class="finder-widget" (click)="openModal()">
        <div class="widget-content">
          <h3>Trouvez votre expert</h3>
          <div class="search-box">
            <input type="text" placeholder="Spécialité, localisation..." readonly>
            <button class="search-btn">Rechercher</button>
          </div>
        </div>
      </div>

      <div class="modal" [class.active]="isModalOpen" (click)="closeModal($event)">
        <div class="modal-content">
          <button class="close-btn" (click)="closeModal($event)">×</button>
          <h2>Trouvez l'expert idéal</h2>
          
          <form (ngSubmit)="onSubmit()" #searchForm="ngForm">
            <div class="form-group">
              <label>Spécialité</label>
              <select name="speciality" [(ngModel)]="searchCriteria.speciality" required>
                <option value="">Sélectionnez une spécialité</option>
                <option value="mecanique">Mécanique</option>
                <option value="carrosserie">Carrosserie</option>
                <option value="electrique">Électrique</option>
                <option value="diagnostic">Diagnostic</option>
              </select>
            </div>

            <div class="form-group">
              <label>Localisation</label>
              <input type="text" name="location" [(ngModel)]="searchCriteria.location" 
                     placeholder="Ville ou code postal" required>
            </div>

            <div class="form-group">
              <label>Expérience minimale</label>
              <select name="experience" [(ngModel)]="searchCriteria.experience">
                <option value="0">Tous niveaux</option>
                <option value="2">2+ ans</option>
                <option value="5">5+ ans</option>
                <option value="10">10+ ans</option>
              </select>
            </div>

            <button type="submit" class="submit-btn" [disabled]="!searchForm.form.valid">
              Rechercher
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .expert-finder {
      padding: 4rem 2rem;
      position: relative;
    }

    .finder-widget {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      padding: 2rem;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .finder-widget:hover {
      transform: translateY(-5px);
    }

    .widget-content h3 {
      color: #2d3436;
      margin-bottom: 1rem;
      text-align: center;
    }

    .search-box {
      display: flex;
      gap: 1rem;
    }

    .search-box input {
      flex: 1;
      padding: 0.8rem;
      border: 2px solid #dfe6e9;
      border-radius: 8px;
      font-size: 1rem;
    }

    .search-btn {
      padding: 0.8rem 1.5rem;
      background: #0984e3;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .search-btn:hover {
      background: #0873c4;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .modal.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      width: 90%;
      max-width: 500px;
      position: relative;
      transform: translateY(-20px);
      transition: transform 0.3s ease;
    }

    .modal.active .modal-content {
      transform: translateY(0);
    }

    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #636e72;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2d3436;
      font-weight: 500;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 0.8rem;
      border: 2px solid #dfe6e9;
      border-radius: 8px;
      font-size: 1rem;
    }

    .submit-btn {
      width: 100%;
      padding: 1rem;
      background: #0984e3;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .submit-btn:hover:not(:disabled) {
      background: #0873c4;
    }

    .submit-btn:disabled {
      background: #b2bec3;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .search-box {
        flex-direction: column;
      }
    }
  `]
})
export class ExpertFinderComponent {
  isModalOpen = false;
  searchCriteria = {
    speciality: '',
    location: '',
    experience: '0'
  };

  openModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(event: Event) {
    if (event.target === event.currentTarget) {
      this.isModalOpen = false;
      document.body.style.overflow = '';
    }
  }

  onSubmit() {
    // Implémenter la logique de recherche
    console.log('Recherche avec critères:', this.searchCriteria);
    this.isModalOpen = false;
    document.body.style.overflow = '';
  }
} 