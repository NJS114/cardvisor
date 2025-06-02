import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { VehicleReply, VehiclesReply } from '../../../../protos/generated/vehicle_pb';

@Component({
  selector: 'app-vehicle-list',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Mes Véhicules</h1>
        <button (click)="addVehicle()"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          <i class="fas fa-plus mr-2"></i>
          Ajouter un véhicule
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let vehicle of vehicles" 
             class="bg-white rounded-lg shadow-md p-4">
          <h2 class="text-xl font-semibold mb-2">
            {{ vehicle.getBrand() }} {{ vehicle.getModel() }}
          </h2>
          <span [class]="getStatusClass(vehicle.getState())">
            {{ vehicle.getState() }}
          </span>
          <div class="mt-4">
            <p class="text-gray-600">{{ vehicle.getYear() }}</p>
            <p class="text-gray-600">{{ vehicle.getMileage() }} km</p>
            <p class="text-gray-600">{{ vehicle.getPriceAnnounced() }} €</p>
          </div>
          
          <div class="mt-6 flex justify-end space-x-4">
            <button (click)="viewDetails(vehicle.getId())"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Voir détails
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class VehicleListComponent implements OnInit {
  vehicles: VehicleReply[] = [];

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  private loadVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe({
      next: (response: VehiclesReply) => {
        this.vehicles = response.getVehiclesList();
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement des véhicules:', error);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm';
      case 'SOLD':
        return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm';
      case 'RESERVED':
        return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm';
      default:
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm';
    }
  }

  viewDetails(id: string): void {
    this.router.navigate(['/vehicles', id]);
  }

  addVehicle(): void {
    this.router.navigate(['/vehicles/new']);
  }
} 