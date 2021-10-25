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
    this.getCategories();
  }

  public getEvents(): void {
    this.historyService.getEvents().subscribe((events:IEvents[]) => {
      for (let event of events) {
        event.type === 'outcome' ? this.outcomeArray.push(event) : null;
      }
    })
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
            // this.chartOptions.series.push()
          }
        }
      }
      console.log(this.pieArray)
    })
    this.getCharts();
  }

  public getCharts(): void {
    if (this.pieArray) {
      this.chartOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'RANDOM DATA'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        exporting: {
          enabled: true
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: this.pieArray
        }]
      };  //
    }
    // [
    //   { name: 'Chrome', y: 61.41 },
    //   { name: 'Internet Explorer', y: 11.84 },
    //   { name: 'Firefox', y: 10.85 },
    //   { name: 'Edge', y: 4.67 },
    //   { name: 'Safari', y: 4.18 },
    //   { name: 'Other', y: 7.05 }
    // ]

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    },300)
  }
}
