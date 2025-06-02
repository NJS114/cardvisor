import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleReply, VehiclesReply, GetVehicleByIdRequest, GetVehicleByVINRequest, GetVehiclesByBrandRequest, GetVehiclesByFuelTypeRequest, GetVehiclesByGearboxRequest, GetVehiclesByYearRequest, GetVehiclesByMaxMileageRequest, GetVehiclesByCriteriaRequest, CreateVehicleRequest, DeleteVehicleRequest, DeleteReply, Empty, GetVehiclesByUserIdRequest } from '../../protos/generated/vehicle_pb';
import { VehicleServiceClient } from '../../protos/generated/VehicleServiceClientPb';
import { Metadata } from 'grpc-web';
import { createGrpcClient } from '../../protos/proto.config';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private client: VehicleServiceClient;

  constructor() {
    const host = 'http://localhost:5257';
    console.log('Initialisation du service de véhicules avec l\'hôte:', host);
    this.client = createGrpcClient(VehicleServiceClient, host);
  }

  getVehicleById(id: string): Observable<VehicleReply> {
    console.log('Début de la récupération du véhicule par ID:', id);
    const request = new GetVehicleByIdRequest();
    request.setId(id);
    return new Observable<VehicleReply>(observer => {
      this.client.getVehicleById(request, null, (error, response) => {
        if (error) {
          console.error('Erreur lors de la récupération du véhicule par ID:', error);
          observer.error(error);
        } else {
          console.log('Véhicule récupéré avec succès:', response.toObject());
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getVehicleByVIN(vin: string): Observable<VehicleReply> {
    const request = new GetVehicleByVINRequest();
    request.setVin(vin);
    const metadata = new Metadata();
    return new Observable<VehicleReply>(observer => {
      this.client.getVehicleByVIN(request, metadata, (err: Error, response: VehicleReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getVehiclesByBrand(brand: string): Observable<VehiclesReply> {
    const request = new GetVehiclesByBrandRequest();
    request.setBrand(brand);
    const metadata = new Metadata();
    return new Observable<VehiclesReply>(observer => {
      this.client.getVehiclesByBrand(request, metadata, (err: Error, response: VehiclesReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getVehiclesByFuelType(fuelType: string): Observable<VehiclesReply> {
    const request = new GetVehiclesByFuelTypeRequest();
    request.setFuelType(fuelType);
    const metadata = new Metadata();
    return new Observable<VehiclesReply>(observer => {
      this.client.getVehiclesByFuelType(request, metadata, (err: Error, response: VehiclesReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getVehiclesByGearbox(gearbox: string): Observable<VehiclesReply> {
    const request = new GetVehiclesByGearboxRequest();
    request.setGearbox(gearbox);
    const metadata = new Metadata();
    return new Observable<VehiclesReply>(observer => {
      this.client.getVehiclesByGearbox(request, metadata, (err: Error, response: VehiclesReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getVehiclesByYear(year: number): Observable<VehiclesReply> {
    const request = new GetVehiclesByYearRequest();
    request.setYear(year);
    const metadata = new Metadata();
    return new Observable<VehiclesReply>(observer => {
      this.client.getVehiclesByYear(request, metadata, (err: Error, response: VehiclesReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getVehiclesByMaxMileage(maxMileage: number): Observable<VehiclesReply> {
    const request = new GetVehiclesByMaxMileageRequest();
    request.setMaxMileage(maxMileage);
    const metadata = new Metadata();
    return new Observable<VehiclesReply>(observer => {
      this.client.getVehiclesByMaxMileage(request, metadata, (err: Error, response: VehiclesReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getVehiclesByCriteria(criteria: {
    fuelType: string;
    gearbox: string;
    maxMileage: number;
  }): Observable<VehiclesReply> {
    const request = new GetVehiclesByCriteriaRequest();
    request.setFuelType(criteria.fuelType);
    request.setGearbox(criteria.gearbox);
    request.setMaxMileage(criteria.maxMileage);
    const metadata = new Metadata();
    return new Observable<VehiclesReply>(observer => {
      this.client.getVehiclesByCriteria(request, metadata, (err: Error, response: VehiclesReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  createVehicle(data: {
    brand: string;
    model: string;
    vin: string;
    fuelType: string;
    gearbox: string;
    year: number;
    mileage: number;
  }): Observable<VehicleReply> {
    const request = new CreateVehicleRequest();
    request.setBrand(data.brand);
    request.setModel(data.model);
    request.setVin(data.vin);
    request.setFuelType(data.fuelType);
    request.setGearbox(data.gearbox);
    request.setYear(data.year);
    request.setMileage(data.mileage);
    const metadata = new Metadata();
    return new Observable<VehicleReply>(observer => {
      this.client.createVehicle(request, metadata, (err: Error, response: VehicleReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getAllVehicles(): Observable<VehiclesReply> {
    const request = new Empty();
    const metadata = new Metadata();
    return new Observable<VehiclesReply>(observer => {
      this.client.getAllVehicles(request, metadata, (err: Error, response: VehiclesReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  deleteVehicle(id: string): Observable<DeleteReply> {
    const request = new DeleteVehicleRequest();
    request.setId(id);
    const metadata = new Metadata();
    return new Observable<DeleteReply>(observer => {
      this.client.deleteVehicle(request, metadata, (err: Error, response: DeleteReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getVehiclesByUserId(userId: string): Observable<VehiclesReply> {
    return new Observable<VehiclesReply>(observer => {
      console.log('Début de la récupération des véhicules pour l\'utilisateur:', userId);
      const request = new GetVehiclesByUserIdRequest();
      request.setUserId(userId);

      try {
        this.client.getVehiclesByUserId(request, null, (err: any, response: VehiclesReply) => {
          console.log('Callback getVehiclesByUserId appelé');
          if (err) {
            console.error("Erreur lors de la récupération des véhicules:", {
              message: err.message,
              code: err.code,
              details: err.details,
              stack: err.stack
            });
            observer.error(err);
          } else {
            console.log('Véhicules récupérés avec succès:', response.toObject());
            observer.next(response);
            observer.complete();
          }
        });
      } catch (error) {
        console.error('Erreur lors de l\'appel à getVehiclesByUserId:', error);
        observer.error(error);
      }
    });
  }
} 