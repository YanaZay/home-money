import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';



const COMPONENTS = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    COMPONENTS
  ],
  exports: [
    COMPONENTS
  ]
})
export class MaterialModule { }
