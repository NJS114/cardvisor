import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppointmentService, CreateAppointmentData, AppointmentStatus } from '../../../../core/services/appointment.service';
import { ExpertService } from '../../../../core/services/expert.service';
import { ExpertReply, ExpertsReply } from '../../../../protos/generated/expert_pb';
import { AppointmentReply } from '../../../../protos/generated/appointment_pb';
import { AddressAutocompleteComponent } from '../../../../shared/components/address-autocomplete/address-autocomplete.component';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddressAutocompleteComponent
  ]
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  experts: ExpertReply[] = [];
  appointmentStatus = AppointmentStatus;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private expertService: ExpertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.appointmentForm = this.fb.group({
      date: ['', [Validators.required]],
      address: ['', [Validators.required]],
      notes: [''],
      expertId: [''] // Rendu optionnel
    });
  }

  ngOnInit(): void {
    this.loadExperts();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAppointment(id);
    }
  }

  loadExperts(): void {
    this.expertService.getAllExperts().subscribe(
      (response: ExpertsReply) => {
        this.experts = response.getExpertsList();
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des experts';
        console.error('Erreur lors du chargement des experts:', error);
      }
    );
  }

  loadAppointment(id: string): void {
    this.appointmentService.getAppointmentById(id).subscribe(
      (appointment: AppointmentReply) => {
        const date = appointment.getDate();
        const [datePart] = date.split('T');
        
        this.appointmentForm.patchValue({
          expertId: appointment.getExpertId(),
          vehicleId: appointment.getVehicleId(),
          date: datePart,
          notes: appointment.getNotes(),
          address: appointment.getAddress()
        });
      },
      (error: Error) => {
        console.error('Erreur lors du chargement du rendez-vous:', error);
      }
    );
  }

  onAddressSelected(address: string): void {
    this.appointmentForm.patchValue({ address });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formData: CreateAppointmentData = {
        date: this.appointmentForm.value.date,
        address: this.appointmentForm.value.address,
        notes: this.appointmentForm.value.notes,
        status: AppointmentStatus.EN_ATTENTE,
        expertId: this.appointmentForm.value.expertId || undefined
      };

      this.appointmentService.createAppointment(formData).subscribe(
        (appointment: AppointmentReply) => {
          this.isSubmitting = false;
          this.router.navigate(['/appointments']);
        },
        (error) => {
          this.isSubmitting = false;
          this.errorMessage = error.message || 'Une erreur est survenue lors de la création du rendez-vous';
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/appointments']);
  }
} 