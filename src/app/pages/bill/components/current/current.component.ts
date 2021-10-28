import { Component, Input, OnInit } from '@angular/core';
import { ICurrentExchangeInterface } from '../../../../shared/models/exchange.interface';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
  @Input() public dataRates!: any;
  public currency: string[] = ['EUR', 'USD', 'UAH'];
  public displayedColumns: string[] = ['currency', 'rates', 'date'];
  public currentCourse: ICurrentExchangeInterface[] = [];

  constructor() {
  }

  public ngOnInit(): void {
    for (let item in this.dataRates.rates) {
      for (let currency of this.currency) {
        if (currency === item) {
          const result = {
            date: this.dataRates.date,
            currency: currency,
            rates: this.dataRates.rates[item]
          }
          this.currentCourse.push(result)
        }
      }
    }
  }
}
