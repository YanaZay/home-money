import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent } from './record.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { FlexModule } from '@angular/flex-layout';
import { AddEventComponent } from './modal/add-event/add-event.component';
import { DeleteCategoryComponent } from './modal/delete-category/delete-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

const routes: Routes = [
  {path: '', component: RecordComponent}
]

@NgModule({
  declarations: [
    RecordComponent,
    AddEventComponent,
    DeleteCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexModule,
    ReactiveFormsModule,
    A11yModule
  ]
})
export class RecordModule { }
