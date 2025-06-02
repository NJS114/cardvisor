import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AddressSuggestion {
  label: string;
  city: string;
  postalCode: string;
  region: string;
  fullAddress: string;
}

@Component({
  selector: 'app-address-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="address-autocomplete">
      <div class="input-container">
        <input
          type="text"
          [(ngModel)]="searchQuery"
          (input)="onInputChange()"
          (blur)="onBlur()"
          placeholder="Entrez une adresse..."
          class="address-input"
        />
        <div *ngIf="isLoading" class="loading">Recherche...</div>
      </div>

      <!-- Liste des suggestions -->
      <div *ngIf="showSuggestions && suggestions.length > 0" class="suggestions-list">
        <div
          *ngFor="let suggestion of suggestions"
          (click)="selectAddress(suggestion)"
          class="suggestion-item"
        >
          <div class="suggestion-label">{{ suggestion.label }}</div>
          <div class="suggestion-details">
            {{ suggestion.city }} ({{ suggestion.postalCode }}) - {{ suggestion.region }}
          </div>
        </div>
      </div>

      <!-- Adresse sélectionnée -->
      <div *ngIf="selectedAddress" class="selected-address">
        <div class="selected-address-details">
          <strong>Ville :</strong> {{ selectedAddress.city }}
          <strong>Région :</strong> {{ selectedAddress.region }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .address-autocomplete {
      position: relative;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }

    .input-container {
      position: relative;
    }

    .address-input {
      width: 100%;
      padding: 0.8rem;
      border: 2px solid #dfe6e9;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .address-input:focus {
      outline: none;
      border-color: #0984e3;
    }

    .loading {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #636e72;
      font-size: 0.9rem;
    }

    .suggestions-list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #dfe6e9;
      border-radius: 8px;
      margin-top: 0.5rem;
      max-height: 300px;
      overflow-y: auto;
      z-index: 1000;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .suggestion-item {
      padding: 0.8rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .suggestion-item:hover {
      background-color: #f8f9fa;
    }

    .suggestion-label {
      font-weight: 500;
      color: #2d3436;
    }

    .suggestion-details {
      font-size: 0.9rem;
      color: #636e72;
      margin-top: 0.2rem;
    }

    .selected-address {
      margin-top: 1rem;
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 8px;
    }

    .selected-address-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .selected-address-details strong {
      color: #2d3436;
      margin-right: 0.5rem;
    }
  `]
})
export class AddressAutocompleteComponent {
  @Output() addressSelected = new EventEmitter<string>();

  searchQuery = '';
  suggestions: AddressSuggestion[] = [];
  selectedAddress: AddressSuggestion | null = null;
  showSuggestions = false;
  isLoading = false;
  private debounceTimeout: any;

  onInputChange() {
    if (this.searchQuery.length < 3) {
      this.suggestions = [];
      this.showSuggestions = false;
      return;
    }

    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.searchAddress();
    }, 300);
  }

  async searchAddress() {
    if (!this.searchQuery) return;

    this.isLoading = true;
    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(this.searchQuery)}&limit=5`
      );
      const data = await response.json();

      this.suggestions = data.features.map((feature: any) => ({
        label: feature.properties.label,
        city: feature.properties.city,
        postalCode: feature.properties.postcode,
        region: feature.properties.context,
        fullAddress: feature.properties.label
      }));

      this.showSuggestions = true;
    } catch (error) {
      console.error('Erreur lors de la recherche d\'adresse:', error);
      this.suggestions = [];
    } finally {
      this.isLoading = false;
    }
  }

  selectAddress(suggestion: AddressSuggestion) {
    this.selectedAddress = suggestion;
    this.searchQuery = suggestion.fullAddress;
    this.showSuggestions = false;
    this.addressSelected.emit(suggestion.fullAddress);
  }

  onBlur() {
    // Petit délai pour permettre le clic sur les suggestions
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }
} 