import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillComponent } from './bill.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: '', component: BillComponent}];

@NgModule({
  declarations: [BillComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BillModule { }
