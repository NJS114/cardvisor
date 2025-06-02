import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">CarAdvisors</h3>
            <p class="text-gray-300">
              Votre partenaire de confiance pour l'expertise automobile.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul class="space-y-2">
              <li><a routerLink="/home" class="text-gray-300 hover:text-white">Accueil</a></li>
              <li><a routerLink="/experts" class="text-gray-300 hover:text-white">Experts</a></li>
              <li><a routerLink="/appointments" class="text-gray-300 hover:text-white">Rendez-vous</a></li>
              <li><a routerLink="/reports" class="text-gray-300 hover:text-white">Rapports</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Email: contact&#64;caradvisors.fr</li>
              <li>Tél: 01 23 45 67 89</li>
              <li>Adresse: 123 rue de l'Expertise, 75000 Paris</li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {{ currentYear }} CarAdvisors. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
} 