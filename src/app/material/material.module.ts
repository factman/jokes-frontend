import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
  ],
})
export class MaterialModule { }
