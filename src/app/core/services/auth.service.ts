import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserServiceClient } from '../../protos/generated/UserServiceClientPb';
import { ExpertServiceClient } from '../../protos/generated/ExpertServiceClientPb';
import { LoginRequest, RegisterRequest, UserReply } from '../../protos/generated/user_pb';
import { CreateExpertRequest } from '../../protos/generated/expert_pb';
import { createGrpcClient } from '../../protos/proto.config';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'EXPERT';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userService: UserServiceClient;
  private expertService: ExpertServiceClient;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const host = 'http://localhost:5257';
    console.log('Initialisation des services gRPC avec l\'hôte:', host);
    
    // Initialisation du service utilisateur
    this.userService = createGrpcClient(UserServiceClient, host);
    console.log('UserService initialisé:', this.userService);
    
    // Initialisation du service expert
    this.expertService = createGrpcClient(ExpertServiceClient, host);
    console.log('ExpertService initialisé:', this.expertService);
    
    this.checkAuth();

    const storedUser = localStorage.getItem('currentUser');
    console.log('Utilisateur stocké:', storedUser);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log('Utilisateur parsé:', parsedUser);
      this.currentUserSubject.next(parsedUser);
    }
  }

  private checkAuth(): void {
    const token = localStorage.getItem('auth_token');
    this.isAuthenticatedSubject.next(!!token);
  }

  login(email: string, password: string): Observable<UserReply> {
    console.log('Début de la méthode login');
    const request = new LoginRequest();
    request.setEmail(email);
    request.setPassword(password);
  
    return new Observable(observer => {
      console.log("Tentative de connexion pour l'email :", email);
      console.log("Configuration du client gRPC :", this.userService);
      console.log("Requête de connexion :", request.toObject());
  
      try {
        this.userService.login(request, null, (err: any, response: UserReply) => {
          console.log('Callback de login appelé');
          if (err) {
            console.error("Erreur de connexion détaillée:", {
              message: err.message,
              code: err.code,
              details: err.details,
              stack: err.stack
            });
            
            if (err.code === 14) { // UNAVAILABLE
              observer.error(new Error('Le serveur est inaccessible. Veuillez réessayer plus tard.'));
            } else if (err.code === 16) { // UNAUTHENTICATED
              observer.error(new Error('Email ou mot de passe incorrect.'));
            } else {
              observer.error(new Error(`Erreur de connexion: ${err.message}`));
            }
          } else {
            console.log('Connexion réussie:', response.toObject());
            const userId = response.getId();
            const user: User = {
              id: userId,
              email: response.getEmail(),
              firstName: response.getFirstName(),
              lastName: response.getLastName(),
              role: response.getRole() as 'USER' | 'EXPERT'
            };
            localStorage.setItem('auth_token', userId);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.isAuthenticatedSubject.next(true);
            observer.next(response);
            observer.complete();
          }
        });
      } catch (error) {
        console.error('Erreur lors de l\'appel à login:', error);
        observer.error(new Error('Une erreur est survenue lors de la connexion.'));
      }
    });
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    phone: string,
    address: string,
    specialities?: string,
    certifications?: string,
    yearsOfExperience?: number
  ): Observable<UserReply> {
    console.log('Début de la méthode register');
    console.log('ExpertService disponible:', !!this.expertService);
    
    if (role !== 'USER' && role !== 'EXPERT') {
      return new Observable(observer => {
        observer.error(new Error('Le rôle doit être USER ou EXPERT'));
      });
    }

    // Si c'est un expert, on utilise directement createExpert
    if (role === 'EXPERT') {
      console.log('Création d\'un compte expert...');
      const expertRequest = new CreateExpertRequest();
      expertRequest.setUserEmail(email);
      expertRequest.setUserPassword(password);
      expertRequest.setFirstName(firstName);
      expertRequest.setLastName(lastName);
      expertRequest.setSpecialities(specialities || '');
      expertRequest.setCertificationDocs(certifications || '');
      expertRequest.setIsAvailable(true);
      expertRequest.setRating(0);
      expertRequest.setYearsOfExperience(yearsOfExperience || 0);

      console.log('Données de création expert:', {
        user_email: email,
        user_password: password,
        first_name: firstName,
        last_name: lastName,
        specialities: specialities || '',
        certification_docs: certifications || '',
        is_available: true,
        rating: 0,
        years_of_experience: yearsOfExperience || 0
      });

      return new Observable(observer => {
        this.expertService.createExpert(expertRequest, null, (err: any, response: any) => {
          if (err) {
            console.error('Erreur lors de la création du compte expert:', {
              message: err.message,
              code: err.code,
              details: err.details,
              stack: err.stack
            });
            observer.error(new Error('Une erreur est survenue lors de la création du compte expert.'));
          } else {
            console.log('Compte expert créé avec succès:', response?.toObject());
            observer.next(response);
            observer.complete();
          }
        });
      });
    }

    // Pour les utilisateurs normaux, on utilise register
    const request = new RegisterRequest();
    request.setFirstName(firstName);
    request.setLastName(lastName);
    request.setEmail(email);
    request.setPassword(password);
    request.setAddress(address);
    request.setPhone(phone);
    request.setRole(role);

    return new Observable(observer => {
      console.log("Tentative d'inscription pour l'email :", email);
      console.log("Données d'inscription:", {
        firstName,
        lastName,
        email,
        role,
        address,
        phone
      });

      try {
        this.userService.register(request, null, (err: any, response: UserReply) => {
          console.log('Callback de register appelé');
          if (err) {
            console.error('Erreur lors de l\'inscription:', {
              message: err.message,
              code: err.code,
              details: err.details,
              stack: err.stack
            });
            observer.error(new Error('Une erreur est survenue lors de l\'inscription.'));
          } else {
            console.log('Inscription réussie:', response.toObject());
            observer.next(response);
            observer.complete();
          }
        });
      } catch (error) {
        console.error('Erreur lors de l\'appel à register:', error);
        observer.error(new Error('Une erreur est survenue lors de l\'inscription.'));
      }
    });
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  loginHttp(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  registerHttp(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'USER' | 'EXPERT';
  }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData);
  }

  logoutHttp(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    const user = this.currentUserSubject.value;
    console.log('getCurrentUser appelé, utilisateur actuel:', user);
    return user;
  }

  getCurrentUserRole(): string {
    const role = this.currentUserSubject.value?.role || '';
    console.log('getCurrentUserRole appelé, rôle actuel:', role);
    return role;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}
