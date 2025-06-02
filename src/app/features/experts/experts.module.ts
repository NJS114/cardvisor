import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpertListComponent } from './components/expert-list/expert-list.component';
import { ExpertDetailComponent } from './components/expert-detail/expert-detail.component';

@NgModule({
  declarations: [
    ExpertListComponent,
    ExpertDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ExpertListComponent },
      { path: ':id', component: ExpertDetailComponent }
    ])
  ]
})
export class ExpertsModule { } 