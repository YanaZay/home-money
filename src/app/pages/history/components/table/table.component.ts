import { Component, OnInit } from '@angular/core';
import { IEvents } from '../../../../shared/models/events.interface';
import { HistoryService } from '../../history.service';
import { ICategories } from '../../../../shared/models/categories.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public currentData: IEvents[] = [];
  public displayedColumns: string[] = ['id', 'amount', 'date', 'category', 'type', 'action'];
  public typeStyle!: boolean;

  constructor(
    private historyService: HistoryService
  ) {}

  public ngOnInit(): void {
    this.historyService.getEvents().subscribe((events:IEvents[]) => {
      this.currentData = events;
    });

    this.historyService.getCategories().subscribe((category:ICategories[]) => {
      for (let cat of category) {
        for (let event of this.currentData) {
          cat.id === event.category ? event.category = cat.name : null;
        }
      }
      console.log(this.currentData)
    })
  }
  // public applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}

