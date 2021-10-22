import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../history.service';
import { IEvents } from '../../../../shared/models/events.interface';
import { ICategories } from '../../../../shared/models/categories.interface';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  public outcomeArray: IEvents[] = [];

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
      console.log(events)
      console.log(this.outcomeArray)
    })
  }

  public getCategories(): void {
    this.historyService.getCategories().subscribe( (categories: ICategories[]) => {
      console.log(categories)

    })
  }
}
