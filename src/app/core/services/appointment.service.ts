import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppointmentServiceClient } from '../../protos/generated/AppointmentServiceClientPb';
import * as appointment_pb from '../../protos/generated/appointment_pb';

export enum AppointmentStatus {
  EN_ATTENTE = 'EN_ATTENTE',
  CONFIRMÉ = 'CONFIRMÉ',
  RÉALISÉ = 'RÉALISÉ',
  ANNULÉ = 'ANNULÉ'
}

export interface Appointment {
  id: string;
  userId: string;
  expertId: string;
  vehicleId: string;
  date: Date;
  status: AppointmentStatus;
  address: string;
  notes?: string;
  durationMinutes?: number;
  createdAt: Date;
  payment?: Payment;
}

export interface Payment {
  id: string;
  appointmentId: string;
  userId: string;
  expertId: string;
  paymentIntentId: string;
  amount: number;
  expertRevenue: number;
  platformFee: number;
  dividendAmount?: number;
  status: 'succeeded' | 'pending' | 'failed';
  paymentDate: Date;
}

export interface CreateAppointmentData {
  date: Date;
  address: string;
  notes?: string;
  status: AppointmentStatus;
  userId: string;
  expertId: string;
  vehicleId: string;
  durationMinutes?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private grpcClient: AppointmentServiceClient;

  constructor() {
    // Remplace l'URL par celle de ton serveur gRPC (ex: http://localhost:5257)
    this.grpcClient = new AppointmentServiceClient('http://localhost:5257');
  }

  // Créer un rendez-vous via gRPC
  createAppointment(data: CreateAppointmentData): Observable<Appointment> {
    const request = new appointment_pb.CreateAppointmentRequest();
    request.setUserId(data.userId);
    request.setExpertId(data.expertId);
    request.setVehicleId(data.vehicleId);
    request.setDate(data.date instanceof Date ? data.date.toISOString() : data.date);
    request.setStatus(data.status);
    request.setAddress(data.address);
    request.setNotes(data.notes || '');
    // durationMinutes n'est pas dans le proto, donc ignoré

    return from(
      this.grpcClient.createAppointment(request).then((a: appointment_pb.AppointmentReply) => ({
        id: a.getId(),
        userId: a.getUserId(),
        expertId: a.getExpertId(),
        vehicleId: a.getVehicleId(),
        date: new Date(a.getDate()),
        status: a.getStatus() as AppointmentStatus,
        address: a.getAddress(),
        notes: a.getNotes(),
        payment: undefined, // Le proto ne fournit pas l'objet complet Payment
        createdAt: new Date(), // Valeur par défaut, car non présente dans le proto
      }))
    );
  }

  // Obtenir un rendez-vous par ID via gRPC
  getAppointmentById(id: string): Observable<Appointment> {
    const request = new appointment_pb.GetAppointmentByIdRequest();
    request.setAppointmentId(id);
    return from(
      this.grpcClient.getAppointmentById(request).then((a: appointment_pb.AppointmentReply) => ({
        id: a.getId(),
        userId: a.getUserId(),
        expertId: a.getExpertId(),
        vehicleId: a.getVehicleId(),
        date: new Date(a.getDate()),
        status: a.getStatus() as AppointmentStatus,
        address: a.getAddress(),
        notes: a.getNotes(),
        payment: undefined, // Le proto ne fournit pas l'objet complet Payment
        createdAt: new Date(), // Valeur par défaut, car non présente dans le proto
      }))
    );
  }

  // Obtenir les rendez-vous d'un expert via gRPC
  getAppointmentsByExpertId(expertId: string): Observable<Appointment[]> {
    const request = new appointment_pb.GetAppointmentsByExpertIdRequest();
    request.setExpertId(expertId);
    return from(
      this.grpcClient.getAppointmentsByExpertId(request).then((reply: appointment_pb.AppointmentsReply) => {
        return reply.getAppointmentsList().map((a) => ({
          id: a.getId(),
          userId: a.getUserId(),
          expertId: a.getExpertId(),
          vehicleId: a.getVehicleId(),
          date: new Date(a.getDate()),
          status: a.getStatus() as AppointmentStatus,
          address: a.getAddress(),
          notes: a.getNotes(),
          payment: undefined,
          createdAt: new Date(),
        }));
      })
    );
  }

  // Obtenir les rendez-vous d'un utilisateur via gRPC
  getAppointmentsByUserId(userId: string): Observable<Appointment[]> {
    const request = new appointment_pb.GetAppointmentsByUserIdRequest();
    request.setUserId(userId);
    return from(
      this.grpcClient.getAppointmentsByUserId(request).then((reply: appointment_pb.AppointmentsReply) => {
        return reply.getAppointmentsList().map((a) => ({
          id: a.getId(),
          userId: a.getUserId(),
          expertId: a.getExpertId(),
          vehicleId: a.getVehicleId(),
          date: new Date(a.getDate()),
          status: a.getStatus() as AppointmentStatus,
          address: a.getAddress(),
          notes: a.getNotes(),
          payment: undefined,
          createdAt: new Date(),
        }));
      })
    );
  }

  // Obtenir tous les rendez-vous via gRPC
  getAllAppointments(): Observable<Appointment[]> {
    const request = new appointment_pb.Empty();
    return from(
      this.grpcClient.getAllAppointments(request).then((reply: appointment_pb.AppointmentsReply) => {
        // Mapping des objets gRPC vers le modèle Angular
        return reply.getAppointmentsList().map((a) => ({
          id: a.getId(),
          userId: a.getUserId(),
          expertId: a.getExpertId(),
          vehicleId: a.getVehicleId(),
          date: new Date(a.getDate()),
          status: a.getStatus() as AppointmentStatus,
          address: a.getAddress(),
          notes: a.getNotes(),
          payment: undefined, // Le proto ne fournit pas l'objet complet Payment
          createdAt: new Date(), // Valeur par défaut, car non présente dans le proto
          // Ajoute d'autres champs si besoin
        }));
      })
    );
  }

  // Mettre à jour le statut d'un rendez-vous via gRPC
  updateAppointmentStatus(id: string, status: AppointmentStatus): Observable<string> {
    const request = new appointment_pb.UpdateAppointmentStatusRequest();
    request.setAppointmentId(id);
    request.setNewStatus(status);
    return from(
      this.grpcClient.updateAppointmentStatus(request).then((reply: appointment_pb.UpdateAppointmentStatusReply) => reply.getMessage())
    );
  }

  // Annuler un rendez-vous via gRPC
  cancelAppointment(id: string): Observable<string> {
    return this.updateAppointmentStatus(id, AppointmentStatus.ANNULÉ);
  }

  // Supprimer un rendez-vous
  deleteAppointment(id: string): Observable<void> {
    return from(fetch(`${environment.apiUrl}/appointments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du rendez-vous');
      }
    }));
  }
} 