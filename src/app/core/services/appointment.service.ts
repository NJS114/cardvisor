import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  AppointmentReply, 
  AppointmentsReply, 
  CreateAppointmentRequest,
  DeleteAppointmentRequest,
  DeleteReply,
  GetAppointmentByIdRequest,
  GetAppointmentsByUserIdRequest,
  GetAppointmentsByExpertIdRequest,
  Empty
} from '../../protos/generated/appointment_pb';
import { AppointmentServiceClient } from '../../protos/generated/AppointmentServiceClientPb';
import { createGrpcClient } from '../../protos/proto.config';

export enum AppointmentStatus {
  EN_ATTENTE = 'EN_ATTENTE',
  CONFIRME = 'CONFIRMÉ',
  ANNULE = 'ANNULÉ',
  REALISE = 'RÉALISÉ'
}

export interface Appointment {
  id: string;
  date: Date;
  status: 'REALISE' | 'EN_ATTENTE' | 'ANNULE' | 'CONFIRME';
  expertId?: string;
  userId: string;
  address: string;
  distance?: number;
  expertName?: string;
  userName?: string;
  notes?: string;
  vehicleId?: string;
}

export interface CreateAppointmentData {
  date: string;
  address: string;
  notes?: string;
  status: AppointmentStatus;
  userId?: string;
  expertId?: string;
  vehicleId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private client: AppointmentServiceClient;

  constructor() {
    const host = 'http://localhost:5257';
    this.client = createGrpcClient(AppointmentServiceClient, host);
  }

  private convertToCreateRequest(data: CreateAppointmentData): CreateAppointmentRequest {
    const request = new CreateAppointmentRequest();
    request.setDate(data.date);
    request.setAddress(data.address);
    if (data.notes) request.setNotes(data.notes);
    request.setStatus(data.status);
    if (data.userId) request.setUserId(data.userId);
    if (data.expertId) request.setExpertId(data.expertId);
    if (data.vehicleId) request.setVehicleId(data.vehicleId);
    return request;
  }

  private convertToAppointment(reply: AppointmentReply): Appointment {
    return {
      id: reply.getId(),
      date: new Date(reply.getDate()),
      status: reply.getStatus() as Appointment['status'],
      expertId: reply.getExpertId(),
      userId: reply.getUserId(),
      address: reply.getAddress(),
      notes: reply.getNotes(),
      vehicleId: reply.getVehicleId()
    };
  }

  createAppointment(data: CreateAppointmentData): Observable<AppointmentReply> {
    return new Observable(observer => {
      const request = this.convertToCreateRequest(data);
      this.client.createAppointment(request, null, (err: Error, response: AppointmentReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getAppointmentById(id: string): Observable<AppointmentReply> {
    return new Observable(observer => {
      const request = new GetAppointmentByIdRequest();
      request.setAppointmentId(id);
      this.client.getAppointmentById(request, null, (err: Error, response: AppointmentReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getAppointmentsByUserId(userId: string): Observable<AppointmentsReply> {
    return new Observable(observer => {
      const request = new GetAppointmentsByUserIdRequest();
      request.setUserId(userId);
      this.client.getAppointmentsByUserId(request, null, (err: Error, response: AppointmentsReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getAppointmentsByExpertId(expertId: string): Observable<AppointmentsReply> {
    return new Observable(observer => {
      const request = new GetAppointmentsByExpertIdRequest();
      request.setExpertId(expertId);
      this.client.getAppointmentsByExpertId(request, null, (err: Error, response: AppointmentsReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  deleteAppointment(id: string): Observable<DeleteReply> {
    return new Observable(observer => {
      const request = new DeleteAppointmentRequest();
      request.setAppointmentId(id);
      this.client.deleteAppointment(request, null, (err: Error, response: DeleteReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getAllAppointments(): Observable<AppointmentsReply> {
    return new Observable(observer => {
      const request = new Empty();
      this.client.getAllAppointments(request, null, (err: Error, response: AppointmentsReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }
} 