import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="testimonials">
      <div class="marquee-container">
        <div class="marquee">
          <div class="marquee-content" *ngFor="let item of marqueeItems">
            <img [src]="item.icon" [alt]="item.text">
            <span>{{ item.text }}</span>
          </div>
        </div>
      </div>

      <h2 class="section-title">Ce que disent nos utilisateurs</h2>
      
      <div class="testimonials-grid">
        <div class="testimonial-card" *ngFor="let testimonial of testimonials">
          <div class="testimonial-header">
            <img [src]="testimonial.avatar" [alt]="testimonial.name" class="avatar">
            <div class="testimonial-info">
              <h3>{{ testimonial.name }}</h3>
              <div class="rating">
                <span *ngFor="let star of [1,2,3,4,5]" 
                      [class.filled]="star <= testimonial.rating">★</span>
              </div>
            </div>
          </div>
          <p class="testimonial-text">{{ testimonial.text }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials {
      padding: 4rem 2rem;
      background-color: #f8f9fa;
      overflow: hidden;
    }

    .marquee-container {
      width: 100%;
      overflow: hidden;
      background: #0984e3;
      padding: 1rem 0;
      margin-bottom: 3rem;
    }

    .marquee {
      display: flex;
      animation: marquee 20s linear infinite;
    }

    .marquee-content {
      display: flex;
      align-items: center;
      margin-right: 2rem;
      color: white;
      white-space: nowrap;
    }

    .marquee-content img {
      width: 24px;
      height: 24px;
      margin-right: 0.5rem;
    }

    @keyframes marquee {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      color: #2d3436;
      margin-bottom: 3rem;
    }

    .testimonials-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .testimonial-card {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .testimonial-card:hover {
      transform: translateY(-5px);
    }

    .testimonial-header {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 1rem;
      object-fit: cover;
    }

    .testimonial-info h3 {
      margin: 0;
      color: #2d3436;
      font-size: 1.2rem;
    }

    .rating {
      color: #dfe6e9;
      font-size: 1.2rem;
    }

    .rating .filled {
      color: #fdcb6e;
    }

    .testimonial-text {
      color: #636e72;
      line-height: 1.6;
      font-style: italic;
    }

    @media (max-width: 768px) {
      .testimonials-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TestimonialsComponent {
  marqueeItems = [
    { icon: 'assets/icons/star.svg', text: 'Plus de 1000 experts certifiés' },
    { icon: 'assets/icons/check.svg', text: 'Satisfaction garantie' },
    { icon: 'assets/icons/clock.svg', text: 'Réponse sous 24h' },
    { icon: 'assets/icons/shield.svg', text: 'Service sécurisé' }
  ];

  testimonials = [
    {
      name: 'Jean Dupont',
      avatar: 'assets/avatars/user1.jpg',
      rating: 5,
      text: 'Un service exceptionnel ! L\'expert m\'a aidé à choisir la voiture parfaite pour mes besoins.'
    },
    {
      name: 'Marie Martin',
      avatar: 'assets/avatars/user2.jpg',
      rating: 5,
      text: 'Consultation rapide et efficace. Je recommande vivement !'
    },
    {
      name: 'Pierre Durand',
      avatar: 'assets/avatars/user3.jpg',
      rating: 4,
      text: 'Des conseils précieux qui m\'ont permis de faire le bon choix.'
    }
  ];
} 