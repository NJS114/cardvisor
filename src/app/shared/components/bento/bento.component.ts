import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bento',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="bento-section">
      <div class="bento-grid">
        <!-- Carte principale -->
        <div class="bento-card main-card" routerLink="/experts">
          <div class="card-content">
            <h3>Experts Certifiés</h3>
            <p>Accédez à notre réseau d'experts automobiles qualifiés</p>
            <div class="icon">🚗</div>
          </div>
        </div>

        <!-- Carte diagnostic -->
        <div class="bento-card diagnostic-card" routerLink="/diagnostic">
          <div class="card-content">
            <h3>Diagnostic Rapide</h3>
            <p>Obtenez un diagnostic précis de votre véhicule</p>
            <div class="icon">🔧</div>
          </div>
        </div>

        <!-- Carte rendez-vous -->
        <div class="bento-card appointment-card" routerLink="/appointments">
          <div class="card-content">
            <h3>Rendez-vous Flexibles</h3>
            <p>Planifiez vos consultations selon vos disponibilités</p>
            <div class="icon">📅</div>
          </div>
        </div>

        <!-- Carte rapports -->
        <div class="bento-card report-card" routerLink="/reports">
          <div class="card-content">
            <h3>Rapports Détaillés</h3>
            <p>Consultez vos rapports d'expertise en ligne</p>
            <div class="icon">📋</div>
          </div>
        </div>

        <!-- Carte conseils -->
        <div class="bento-card advice-card" routerLink="/advice">
          <div class="card-content">
            <h3>Conseils Personnalisés</h3>
            <p>Recevez des recommandations adaptées à vos besoins</p>
            <div class="icon">💡</div>
          </div>
        </div>

        <!-- Carte communauté -->
        <div class="bento-card community-card" routerLink="/community">
          <div class="card-content">
            <h3>Communauté Active</h3>
            <p>Échangez avec d'autres passionnés d'automobile</p>
            <div class="icon">👥</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .bento-section {
      padding: 4rem 2rem;
      background-color: #f8f9fa;
    }

    .bento-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    .bento-card {
      border-radius: 24px;
      padding: 2rem;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bento-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    .card-content {
      position: relative;
      z-index: 1;
      color: #2d3436;
      text-align: center;
    }

    .card-content h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .card-content p {
      font-size: 1rem;
      opacity: 0.9;
    }

    .icon {
      font-size: 2rem;
      margin-top: 1rem;
    }

    /* Cartes avec couleurs pastels */
    .main-card {
      background: linear-gradient(135deg, #a8e6cf 0%, #88d8b0 100%);
      grid-column: span 2;
      grid-row: span 2;
    }

    .diagnostic-card {
      background: linear-gradient(135deg, #ffd3b6 0%, #ffaaa5 100%);
    }

    .appointment-card {
      background: linear-gradient(135deg, #b5e2ff 0%, #8ac6d1 100%);
    }

    .report-card {
      background: linear-gradient(135deg, #d4a5ff 0%, #b388ff 100%);
    }

    .advice-card {
      background: linear-gradient(135deg, #ffb6b9 0%, #fae3d9 100%);
    }

    .community-card {
      background: linear-gradient(135deg, #b5e2ff 0%, #8ac6d1 100%);
    }

    /* Effet de survol */
    .bento-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }

    .bento-card:hover::before {
      transform: translateY(0);
    }

    @media (max-width: 1024px) {
      .bento-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .main-card {
        grid-column: span 2;
        grid-row: span 1;
      }
    }

    @media (max-width: 768px) {
      .bento-grid {
        grid-template-columns: 1fr;
      }

      .main-card {
        grid-column: span 1;
      }
    }
  `]
})
export class BentoComponent {} 