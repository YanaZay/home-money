import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../history.service';
import { IEvents } from '../../../../shared/models/events.interface';
import { ICategories } from '../../../../shared/models/categories.interface';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { IPartPie, IPie } from '../../../../shared/models/pie.interface';



@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  public outcomeArray: IEvents[] = [];
  public Highcharts = Highcharts;
  public chartOptions = {};
  public pieArray: IPartPie[] = [];

  constructor(
    private historyService: HistoryService
  ) {}

  public ngOnInit(): void {
    this.getEvents();
    this.viewCharts();
  }

  public getEvents(): void {
    this.historyService.getEvents().subscribe((events:IEvents[]) => {
      for (let event of events) {
        event.type === 'outcome' ? this.outcomeArray.push(event) : null;
      }
    })
    this.getCategories();
  }

  public getCategories(): void {
    this.historyService.getCategories().subscribe( (categories: ICategories[]) => {
      for (let cat of categories) {
        for (let item of this.outcomeArray) {
          if (cat.id === item.category) {
            const result = {
              name: cat.name,
              y: item.amount
            }
            this.pieArray.push(result);
          }
        }
      }
    })
  }

  public viewCharts(): void {
     this.chartOptions = {
        chart: {
          renderTo: 'histogram',
          defaultSeriesType: 'pie',
          backgroundColor:'rgba(255, 255, 255, 0.0)',
        },
        title: {
          text: null
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            // colors: pieColors,
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
              distance: -50,
              filter: {
                property: 'percentage',
                operator: '>',
                value: 4
              }
            }
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: this.pieArray
        }]
    }

    HC_exporting(Highcharts);

  }

}
