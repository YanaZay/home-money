import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent } from './record.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { FlexModule } from '@angular/flex-layout';

const routes: Routes = [
  {path: '', component: RecordComponent}
]

@NgModule({
  declarations: [
    RecordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexModule
  ]
})
export class RecordModule { }
