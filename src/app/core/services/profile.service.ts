import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserServiceClient } from '../../protos/generated/UserServiceClientPb';
import {
  GetUserRequest,
  UserReply,
  UpdateUserRequest,
  UpdatePasswordRequest
} from '../../protos/generated/user_pb';
import { createGrpcClient } from '../../protos/proto.config';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  role?: string;
  isVerified?: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userService: UserServiceClient;

  constructor() {
    const host = 'http://localhost:5257';
    console.log('Initialisation du service de profil avec l\'hôte:', host);
    this.userService = createGrpcClient(UserServiceClient, host);
  }

  getProfile(): Observable<UserProfile> {
    return new Observable(observer => {
      console.log('Début de la récupération du profil');
      const request = new GetUserRequest();
      const userId = localStorage.getItem('auth_token');
      console.log('ID utilisateur récupéré:', userId);
      request.setUserId(userId || '');

      try {
        this.userService.getUser(request, null, (err: any, response: UserReply) => {
          console.log('Callback getUser appelé');
          if (err) {
            console.error("Erreur lors de la récupération du profil:", {
              message: err.message,
              code: err.code,
              details: err.details,
              stack: err.stack
            });
            observer.error(err);
          } else {
            console.log('Profil récupéré avec succès:', response.toObject());
            const profile: UserProfile = {
              id: response.getId(),
              firstName: response.getFirstName(),
              lastName: response.getLastName(),
              email: response.getEmail(),
              phone: response.getPhone(),
              address: response.getAddress(),
              role: response.getRole(),
              isVerified: response.getIsVerified(),
              createdAt: response.getCreatedAt()
            };
            observer.next(profile);
            observer.complete();
          }
        });
      } catch (error) {
        console.error('Erreur lors de l\'appel à getUser:', error);
        observer.error(error);
      }
    });
  }

  updateProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    return new Observable(observer => {
      console.log('Début de la mise à jour du profil:', profile);
      const request = new UpdateUserRequest();
      request.setUserId(profile.id || '');
      request.setFirstName(profile.firstName || '');
      request.setLastName(profile.lastName || '');
      request.setEmail(profile.email || '');
      if (profile.phone) request.setPhone(profile.phone);
      if (profile.address) request.setAddress(profile.address);

      try {
        this.userService.updateUser(request, null, (err: any, response: UserReply) => {
          console.log('Callback updateUser appelé');
          if (err) {
            console.error("Erreur lors de la mise à jour du profil:", {
              message: err.message,
              code: err.code,
              details: err.details,
              stack: err.stack
            });
            observer.error(err);
          } else {
            console.log('Profil mis à jour avec succès:', response.toObject());
            const updatedProfile: UserProfile = {
              id: response.getId(),
              firstName: response.getFirstName(),
              lastName: response.getLastName(),
              email: response.getEmail(),
              phone: response.getPhone(),
              address: response.getAddress(),
              role: response.getRole(),
              isVerified: response.getIsVerified(),
              createdAt: response.getCreatedAt()
            };
            observer.next(updatedProfile);
            observer.complete();
          }
        });
      } catch (error) {
        console.error('Erreur lors de l\'appel à updateUser:', error);
        observer.error(error);
      }
    });
  }

  updatePassword(currentPassword: string, newPassword: string): Observable<void> {
    return new Observable(observer => {
      console.log('Début de la mise à jour du mot de passe');
      const request = new UpdatePasswordRequest();
      const userId = localStorage.getItem('auth_token');
      request.setUserId(userId || '');
      request.setCurrentPassword(currentPassword);
      request.setNewPassword(newPassword);

      try {
        this.userService.updatePassword(request, null, (err: any, _) => {
          console.log('Callback updatePassword appelé');
          if (err) {
            console.error("Erreur lors de la mise à jour du mot de passe:", {
              message: err.message,
              code: err.code,
              details: err.details,
              stack: err.stack
            });
            observer.error(err);
          } else {
            console.log('Mot de passe mis à jour avec succès');
            observer.next();
            observer.complete();
          }
        });
      } catch (error) {
        console.error('Erreur lors de l\'appel à updatePassword:', error);
        observer.error(error);
      }
    });
  }
}
