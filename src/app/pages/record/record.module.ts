import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent } from './record.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { FlexModule } from '@angular/flex-layout';
import { AddEventComponent } from './modal/add-event/add-event.component';
import { DeleteCategoryComponent } from './modal/delete-category/delete-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { RecordService } from './record.service';
import { HistoryService } from '../history/history.service';
import { AddCategoryComponent } from './modal/add-category/add-category.component';
import { EditCategoryComponent } from './modal/edit-category/edit-category.component';

const routes: Routes = [
  {path: '', component: RecordComponent}
]

@NgModule({
  declarations: [
    RecordComponent,
    AddEventComponent,
    DeleteCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexModule,
    ReactiveFormsModule,
    A11yModule,
    FormsModule
  ],
  providers: [
    RecordService,
    HistoryService
  ]
})
export class RecordModule { }
