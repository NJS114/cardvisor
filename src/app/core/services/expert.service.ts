import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpertReply, ExpertsReply, GetExpertByIdRequest, GetExpertsByAvailabilityRequest, GetExpertsBySpecialityRequest, CreateExpertRequest, DeleteExpertRequest, DeleteReply, Empty, GetExpertsByYearsOfExperienceRequest, GetExpertsByRatingRequest } from '../../protos/generated/expert_pb';
import { ExpertServiceClient } from '../../protos/generated/ExpertServiceClientPb';
import { createGrpcClient } from '../../protos/proto.config';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  private client: ExpertServiceClient;

  constructor() {
    const host = 'http://localhost:5257';
    console.log('Initialisation du service des experts avec l\'hôte:', host);
    this.client = createGrpcClient(ExpertServiceClient, host);
  }

  getExpertById(id: string): Observable<ExpertReply> {
    console.log('Récupération de l\'expert avec l\'ID:', id);
    const request = new GetExpertByIdRequest();
    request.setId(id);
    return new Observable<ExpertReply>(observer => {
      this.client.getExpertById(request, null, (err: Error, response: ExpertReply) => {
        if (err) {
          console.error('Erreur lors de la récupération de l\'expert:', err);
          observer.error(err);
        } else {
          console.log('Expert récupéré avec succès:', response.toObject());
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getAllExperts(): Observable<ExpertsReply> {
    console.log('Récupération de tous les experts');
    const request = new Empty();
    return new Observable<ExpertsReply>(observer => {
      this.client.getAllExperts(request, null, (err: Error, response: ExpertsReply) => {
        if (err) {
          console.error('Erreur lors de la récupération des experts:', err);
          observer.error(err);
        } else {
          console.log('Experts récupérés avec succès:', response.toObject());
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getExpertsByAvailability(isAvailable: boolean): Observable<ExpertsReply> {
    console.log('Récupération des experts disponibles:', isAvailable);
    const request = new GetExpertsByAvailabilityRequest();
    request.setIsAvailable(isAvailable);
    return new Observable<ExpertsReply>(observer => {
      this.client.getExpertsByAvailability(request, null, (err: Error, response: ExpertsReply) => {
        if (err) {
          console.error('Erreur lors de la récupération des experts disponibles:', err);
          observer.error(err);
        } else {
          console.log('Experts disponibles récupérés avec succès:', response.toObject());
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getExpertsBySpeciality(speciality: string): Observable<ExpertsReply> {
    console.log('Récupération des experts par spécialité:', speciality);
    const request = new GetExpertsBySpecialityRequest();
    request.setSpeciality(speciality);
    return new Observable<ExpertsReply>(observer => {
      this.client.getExpertsBySpeciality(request, null, (err: Error, response: ExpertsReply) => {
        if (err) {
          console.error('Erreur lors de la récupération des experts par spécialité:', err);
          observer.error(err);
        } else {
          console.log('Experts par spécialité récupérés avec succès:', response.toObject());
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getExpertsByYearsOfExperience(yearsOfExperience: number): Observable<ExpertsReply> {
    return new Observable(observer => {
      const request = new GetExpertsByYearsOfExperienceRequest();
      request.setYearsOfExperience(yearsOfExperience);

      this.client.getExpertsByYearsOfExperience(request, null, (err: any, response: ExpertsReply) => {
        if (err) {
          console.error('Erreur lors de la récupération des experts par années d\'expérience:', err);
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getExpertsByRating(rating: string): Observable<ExpertsReply> {
    console.log('Récupération des experts avec note:', rating);
    const request = new GetExpertsByRatingRequest();
    request.setRating(rating);
    return new Observable<ExpertsReply>(observer => {
      this.client.getExpertsByRating(request, null, (err: Error, response: ExpertsReply) => {
        if (err) {
          console.error('Erreur lors de la récupération des experts par note:', err);
          observer.error(err);
        } else {
          console.log('Experts récupérés avec succès:', response.toObject());
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  createExpert(
    userEmail: string,
    userPassword: string,
    firstName: string,
    lastName: string,
    specialities: string,
    certificationDocs: string,
    isAvailable: boolean,
    rating: number,
    yearsOfExperience: number
  ): Observable<ExpertReply> {
    return new Observable(observer => {
      const request = new CreateExpertRequest();
      request.setUserEmail(userEmail);
      request.setUserPassword(userPassword);
      request.setFirstName(firstName);
      request.setLastName(lastName);
      request.setSpecialities(specialities);
      request.setCertificationDocs(certificationDocs);
      request.setIsAvailable(isAvailable);
      request.setRating(rating);
      request.setYearsOfExperience(yearsOfExperience);

      this.client.createExpert(request, null, (err: any, response: ExpertReply) => {
        if (err) {
          console.error('Erreur lors de la création de l\'expert:', err);
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  deleteExpert(id: string): Observable<DeleteReply> {
    console.log('Suppression de l\'expert avec l\'ID:', id);
    const request = new DeleteExpertRequest();
    request.setId(id);
    return new Observable<DeleteReply>(observer => {
      this.client.deleteExpert(request, null, (err: Error, response: DeleteReply) => {
        if (err) {
          console.error('Erreur lors de la suppression de l\'expert:', err);
          observer.error(err);
        } else {
          console.log('Expert supprimé avec succès:', response.toObject());
          observer.next(response);
          observer.complete();
        }
      });
    });
  }
} 