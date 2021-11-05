import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { PieComponent } from './components/pages/main-page/pie/pie.component';
import { TableComponent } from './components/pages/main-page/table/table.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { HighchartsChartModule } from "highcharts-angular";
import { FlexModule } from '@angular/flex-layout';
import { CardComponent } from './components/pages/card/card.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { HistoryService } from './history.service';

const routes: Routes = [
  {path: '', component: HistoryComponent, children: [
    {path: '', component: MainPageComponent},
    {path: ':id', component: CardComponent},
    {path: '', redirectTo: '' , pathMatch: 'full'}
  ]}];

@NgModule({
  declarations: [
    HistoryComponent,
    PieComponent,
    TableComponent,
    CardComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HighchartsChartModule,
    FlexModule
  ],
  providers: [
    HistoryService
  ]
})
export class HistoryModule {}
