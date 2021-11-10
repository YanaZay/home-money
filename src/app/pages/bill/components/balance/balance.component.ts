import { Component, Input } from '@angular/core';
import { IBill } from "../../../../shared/models/bill.interface";
import { IExchangeInterface } from '../../../../shared/models/exchange.interface';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})

export class BalanceComponent {
  @Input() public dataRates!: IExchangeInterface;
  @Input() public dataBill!: IBill;
}
