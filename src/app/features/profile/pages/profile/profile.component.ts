import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService, UserProfile } from '../../../../core/services/profile.service';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { VehicleReply, VehiclesReply } from '../../../../protos/generated/vehicle_pb';
import { AppointmentReply, AppointmentsReply } from '../../../../protos/generated/appointment_pb';

@Component({
  selector: 'app-profile',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white shadow rounded-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Mon Profil</h1>
            <button (click)="onEdit()" 
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Modifier
            </button>
          </div>

          <div class="space-y-6">
            <div>
              <h2 class="text-lg font-medium text-gray-900">Informations Personnelles</h2>
              <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p class="text-sm font-medium text-gray-500">Prénom</p>
                  <p class="mt-1 text-sm text-gray-900">{{ user?.firstName }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Nom</p>
                  <p class="mt-1 text-sm text-gray-900">{{ user?.lastName }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Email</p>
                  <p class="mt-1 text-sm text-gray-900">{{ user?.email }}</p>
                </div>
                <div *ngIf="user?.phone">
                  <p class="text-sm font-medium text-gray-500">Téléphone</p>
                  <p class="mt-1 text-sm text-gray-900">{{ user?.phone }}</p>
                </div>
                <div *ngIf="user?.address" class="sm:col-span-2">
                  <p class="text-sm font-medium text-gray-500">Adresse</p>
                  <p class="mt-1 text-sm text-gray-900">{{ user?.address }}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 class="text-lg font-medium text-gray-900">Mes Véhicules</h2>
              <div class="mt-4">
                <div *ngIf="vehicles.length === 0" class="text-gray-500 text-sm">
                  Aucun véhicule enregistré
                </div>
                <div *ngFor="let vehicle of vehicles" class="border rounded-lg p-4 mb-4">
                  <p class="font-medium">{{ vehicle.getBrand() }} {{ vehicle.getModel() }}</p>
                  <p class="text-sm text-gray-500">Année: {{ vehicle.getYear() }}</p>
                  <p class="text-sm text-gray-500">Kilométrage: {{ vehicle.getKilometers() }} km</p>
                  <p class="text-sm text-gray-500">Carburant: {{ vehicle.getFuelType() }}</p>
                  <p class="text-sm text-gray-500">État: {{ vehicle.getState() }}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 class="text-lg font-medium text-gray-900">Mes Rendez-vous</h2>
              <div class="mt-4">
                <div *ngIf="appointments.length === 0" class="text-gray-500 text-sm">
                  Aucun rendez-vous planifié
                </div>
                <div *ngFor="let appointment of appointments" class="border rounded-lg p-4 mb-4">
                  <p class="font-medium">Date: {{ appointment.getDate() | date:'dd/MM/yyyy HH:mm' }}</p>
                  <p class="text-sm text-gray-500">Statut: {{ appointment.getStatus() }}</p>
                  <p class="text-sm text-gray-500">Adresse: {{ appointment.getAddress() }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: UserProfile | null = null;
  vehicles: VehicleReply[] = [];
  appointments: AppointmentReply[] = [];

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private vehicleService: VehicleService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.loadProfile();
    this.loadVehicles();
    this.loadAppointments();
  }

  private loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (profile) => {
        this.user = profile;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
      }
    });
  }

  private loadVehicles() {
    const userId = localStorage.getItem('auth_token');
    if (!userId) {
      console.error('Aucun ID utilisateur trouvé');
      return;
    }

    this.vehicleService.getVehiclesByUserId(userId).subscribe({
      next: (response: VehiclesReply) => {
        this.vehicles = response.getVehiclesList();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des véhicules:', error);
      }
    });
  }

  private loadAppointments() {
    const userId = localStorage.getItem('auth_token');
    if (!userId) {
      console.error('Aucun ID utilisateur trouvé');
      return;
    }

    this.appointmentService.getAppointmentsByUserId(userId).subscribe({
      next: (response: AppointmentsReply) => {
        this.appointments = response.getAppointmentsList();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des rendez-vous:', error);
      }
    });
  }

  onEdit() {
    this.router.navigate(['/profile/edit']);
  }
} 