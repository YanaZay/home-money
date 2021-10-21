import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {BillService} from "./bill.service";
import {IExchangeInterface} from "../../shared/models/exchange.interface";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  @Input() public rates: EventEmitter<IExchangeInterface> = new EventEmitter<IExchangeInterface>();
  constructor(private billService: BillService) { }

  ngOnInit(): void {
    this.billService.getExchangeRates().subscribe((data:IExchangeInterface) => {
      this.rates.emit(data);
    })
  }
}
