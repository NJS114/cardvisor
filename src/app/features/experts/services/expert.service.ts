import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Expert {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialities: string[];
  yearsOfExperience: number;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  hourlyRate: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  private apiUrl = `${environment.apiUrl}/experts`;

  constructor(private http: HttpClient) {}

  getExpertById(id: string): Observable<Expert> {
    return this.http.get<Expert>(`${this.apiUrl}/${id}`);
  }

  updateExpert(id: string, data: Partial<Expert>): Observable<Expert> {
    return this.http.put<Expert>(`${this.apiUrl}/${id}`, data);
  }

  updateAvailability(id: string, isAvailable: boolean): Observable<Expert> {
    return this.http.patch<Expert>(`${this.apiUrl}/${id}/availability`, { isAvailable });
  }

  updateHourlyRate(id: string, rate: number): Observable<Expert> {
    return this.http.patch<Expert>(`${this.apiUrl}/${id}/rate`, { rate });
  }

  getExpertReviews(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/reviews`);
  }

  getExpertAppointments(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/appointments`);
  }
} 