import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentErrorComponent } from './components/payment-error/payment-error.component';

@NgModule({
  declarations: [
    PaymentFormComponent,
    PaymentSuccessComponent,
    PaymentErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'checkout',
        component: PaymentFormComponent
      },
      {
        path: 'success',
        component: PaymentSuccessComponent
      },
      {
        path: 'error',
        component: PaymentErrorComponent
      }
    ])
  ]
})
export class PaymentsModule { } 