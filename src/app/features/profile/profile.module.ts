import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ProfileService } from '../../core/services/profile.service';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'edit', component: EditProfileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ProfileComponent
  ],
  declarations: [
    EditProfileComponent
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { } 