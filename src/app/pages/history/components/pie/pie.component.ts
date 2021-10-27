import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoryService } from '../../history.service';
import { IEvents } from '../../../../shared/models/events.interface';
import { ICategories } from '../../../../shared/models/categories.interface';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { IPartPie } from '../../../../shared/models/pie.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit, OnDestroy {
  public outcomeArray: IEvents[] = [];
  public Highcharts = Highcharts;
  public chartOptions = {};
  public pieArray: IPartPie[] = [];
  private destroy$: Subject<void> =  new Subject<void>();

  constructor(
    private historyService: HistoryService
  ) {}

  public ngOnInit(): void {
    this.getEvents();
    this.viewCharts();
    console.log(new Date())
  }

  public getEvents(): void {
    this.historyService.getEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe((events:IEvents[]) => {
      for (let event of events) {
        event.type === 'outcome' ? this.outcomeArray.push(event) : null;
      }
    })
    this.getCategories();
  }

  public getCategories(): void {
    let currentArray: IPartPie[] = [];
    this.historyService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe( (categories: ICategories[]) => {
      for (let cat of categories) {
        for (let item of this.outcomeArray) {
          if (cat.id === item.category) {
            const result = {
              name: cat.name,
              y: item.amount
            }
            currentArray.push(result);
          }
        }
      }

      let noUniqArray: IPartPie[] = [];
      currentArray.filter(( currentObject) => {
        let value = this.pieArray.findIndex(x => (x.name === currentObject.name));
        if (value <= -1) {
          this.pieArray.push(currentObject);
        } else {
          noUniqArray.push(currentObject)
        }
      })

      for (let value of this.pieArray) {
        for (let noUniq of noUniqArray) {
          noUniq.name === value.name ? value.y += noUniq.y : null;
        }
      }
    })
    console.log(this.pieArray)
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
       exporting: {
          buttons: {
            contextButton: {
              className: null,
              enabled: false
            }
          }
       },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            // colors: this.getColors(),
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

  public getColors (): any {
    // let colors = [];
    // let base = Highcharts.getOptions().colors;
    //
    // for (let i = 0; i < 10; i += 1) {
    //
    //   colors.push(Highcharts.color(base).brighten((i - 3) / 7).get());
    // }
    // return colors;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
