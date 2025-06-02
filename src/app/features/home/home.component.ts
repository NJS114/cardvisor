import { Component } from '@angular/core';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { HowItWorksComponent } from '../../shared/components/how-it-works/how-it-works.component';
import { TestimonialsComponent } from '../../shared/components/testimonials/testimonials.component';
import { ExpertFinderComponent } from '../../shared/components/expert-finder/expert-finder.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    HowItWorksComponent,
    TestimonialsComponent,
    ExpertFinderComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-how-it-works></app-how-it-works>
    <app-expert-finder></app-expert-finder>
    <app-testimonials></app-testimonials>
  `
})
export class HomeComponent {} 