import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportServiceClient } from '../../protos/generated/ReportServiceClientPb';
import { 
  CreateReportRequest, 
  GetReportByAppointmentRequest, 
  GetReportsByUserRequest,
  ReportReply,
  ReportsReply
} from '../../protos/generated/report_pb';
import { Metadata } from 'grpc-web';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reportService: ReportServiceClient;

  constructor() {
    this.reportService = new ReportServiceClient('http://localhost:5257');
  }

  createReport(data: {
    appointmentId: string;
    summary: string;
    recommendations: string;
    estimatedValue: number;
    priceNegotiationAdvice: string;
    documentUrl: string;
  }): Observable<ReportReply> {
    const request = new CreateReportRequest();
    request.setAppointmentId(data.appointmentId);
    request.setSummary(data.summary);
    request.setRecommendations(data.recommendations);
    request.setEstimatedValue(data.estimatedValue);
    request.setPriceNegotiationAdvice(data.priceNegotiationAdvice);
    request.setDocumentUrl(data.documentUrl);
    const metadata = new Metadata();

    return new Observable(observer => {
      this.reportService.createReport(request, metadata, (err: any, response: any) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getReportsByUser(userId: string): Observable<ReportReply[]> {
    const request = new GetReportsByUserRequest();
    request.setUserId(userId);
    const metadata = new Metadata();

    return new Observable(observer => {
      this.reportService.getReportsByUser(request, metadata, (err: any, response: ReportsReply) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response.getReportsList());
          observer.complete();
        }
      });
    });
  }

  getReportByAppointment(appointmentId: string): Observable<ReportReply> {
    const request = new GetReportByAppointmentRequest();
    request.setAppointmentId(appointmentId);
    const metadata = new Metadata();

    return new Observable(observer => {
      this.reportService.getReportByAppointmentId(request, metadata, (err: any, response: any) => {
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