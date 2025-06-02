import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="how-it-works">
      <h2 class="section-title">Comment ça marche ?</h2>
      <div class="steps-container">
        <div class="step" *ngFor="let step of steps; let i = index" [class.active]="isStepActive(i)">
          <div class="step-icon">
            <img [src]="step.icon" [alt]="step.title">
          </div>
          <div class="step-content">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
          <div class="step-number">{{ i + 1 }}</div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .how-it-works {
      padding: 4rem 2rem;
      background-color: #ffffff;
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      color: #2d3436;
      margin-bottom: 3rem;
    }

    .steps-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .step {
      position: relative;
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 16px;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .step:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    .step.active {
      background: #e3f2fd;
    }

    .step-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .step-icon img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .step-content {
      text-align: center;
    }

    .step-content h3 {
      font-size: 1.5rem;
      color: #2d3436;
      margin-bottom: 1rem;
    }

    .step-content p {
      color: #636e72;
      line-height: 1.6;
    }

    .step-number {
      position: absolute;
      top: -15px;
      right: -15px;
      width: 40px;
      height: 40px;
      background: #0984e3;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
    }

    @media (max-width: 768px) {
      .steps-container {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HowItWorksComponent {
  steps = [
    {
      title: 'Trouvez votre expert',
      description: 'Parcourez notre sélection d\'experts automobiles qualifiés et certifiés.',
      icon: 'assets/icons/find-expert.svg'
    },
    {
      title: 'Planifiez une consultation',
      description: 'Choisissez un créneau qui vous convient pour discuter de vos besoins.',
      icon: 'assets/icons/schedule.svg'
    },
    {
      title: 'Recevez des conseils personnalisés',
      description: 'Bénéficiez d\'un accompagnement sur mesure pour vos projets automobiles.',
      icon: 'assets/icons/advice.svg'
    }
  ];

  isStepActive(index: number): boolean {
    return false; // À implémenter avec une logique de scroll ou d'interaction
  }
} 