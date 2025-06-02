import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { ExpertsModule } from './features/experts/experts.module';
import { VehiclesModule } from './features/vehicles/vehicles.module';
import { AppointmentsModule } from './features/appointments/appointments.module';
import { ReportsModule } from './features/reports/reports.module';
import { CoreModule } from './core/core.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SharedModule,
    AuthModule,
    ExpertsModule,
    VehiclesModule,
    AppointmentsModule,
    ReportsModule,
    CoreModule
  ],
  template: `
    <app-navbar></app-navbar>
    <main class="min-h-screen">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main {
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  title = 'caradvisors-app';
}
