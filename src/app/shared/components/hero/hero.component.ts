import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Trouvez l'expert automobile qu'il vous faut</h1>
          <h2 class="hero-subtitle">Des conseils professionnels à portée de clic</h2>
          <p class="hero-description">
            Connectez-vous avec des experts automobiles qualifiés pour des conseils personnalisés et des solutions adaptées à vos besoins.
          </p>
          <div class="hero-buttons">
            <button class="btn-primary" routerLink="/experts">Trouver un expert</button>
            <button class="btn-secondary" routerLink="/devenir-expert">Devenir expert</button>
          </div>
        </div>
        <div class="hero-image">
          <img src="assets/images/hero-car.svg" alt="Expert automobile" class="floating-animation">
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      padding: 4rem 2rem;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }

    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: center;
    }

    .hero-text {
      padding-right: 2rem;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      color: #2d3436;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.5rem;
      color: #636e72;
      margin-bottom: 1.5rem;
    }

    .hero-description {
      font-size: 1.1rem;
      color: #636e72;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
    }

    .btn-primary, .btn-secondary {
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .btn-primary {
      background-color: #0984e3;
      color: white;
      border: none;
    }

    .btn-secondary {
      background-color: transparent;
      color: #0984e3;
      border: 2px solid #0984e3;
    }

    .btn-primary:hover {
      background-color: #0873c4;
      transform: translateY(-2px);
    }

    .btn-secondary:hover {
      background-color: #f1f2f6;
      transform: translateY(-2px);
    }

    .hero-image {
      position: relative;
    }

    .hero-image img {
      width: 100%;
      height: auto;
      max-width: 500px;
    }

    .floating-animation {
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }

    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .hero-text {
        padding-right: 0;
      }

      .hero-buttons {
        justify-content: center;
      }

      .hero-image {
        order: -1;
      }
    }
  `]
})
export class HeroComponent {} 