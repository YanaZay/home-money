import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { PieComponent } from './components/pie/pie.component';
import { TableComponent } from './components/table/table.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { HighchartsChartModule } from "highcharts-angular";
import { FlexModule } from '@angular/flex-layout';
import { CardComponent } from './components/card/card.component';


const routes: Routes = [{path: '', component: HistoryComponent, children: [
    {path: '', component: PieComponent},
    {path: '', component: TableComponent},
    {path: 'card:id', component: CardComponent}
  ]}];

@NgModule({
  declarations: [
    HistoryComponent,
    PieComponent,
    TableComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HighchartsChartModule,
    FlexModule
  ]
})
export class HistoryModule { }
