import { Component, Input } from '@angular/core';
import { VehicleReply } from '../../../protos/generated/vehicle_pb';

@Component({
  selector: 'app-vehicle-card',
  template: `
    <div class="bg-white rounded-lg shadow-md p-4">
      <h3 class="text-lg font-semibold">{{ vehicle?.getBrand() }} {{ vehicle?.getModel() }}</h3>
      <p class="text-gray-600">{{ vehicle?.getYear() }}</p>
      <p class="text-gray-600">{{ vehicle?.getMileage() }} km</p>
      <p class="text-gray-600">{{ vehicle?.getPriceAnnounced() }} €</p>
      <p class="text-gray-600">{{ vehicle?.getGearbox() }}</p>
      <p class="text-gray-600">{{ vehicle?.getFuelType() }}</p>
    </div>
  `
})
export class VehicleCardComponent {
  @Input() vehicle?: VehicleReply;
} 