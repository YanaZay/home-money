import { Component, OnInit } from '@angular/core';
import { IEvents } from '../../../../shared/models/events.interface';
import { HistoryService } from '../../history.service';
import { ICategories } from '../../../../shared/models/categories.interface';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public currentData!: MatTableDataSource<IEvents>;
  public displayedColumns: string[] = ['id', 'amount', 'date', 'category', 'type', 'action'];

  constructor(
    private historyService: HistoryService
  ) {}

  public ngOnInit(): void {
    let currentValue: IEvents[] = [];
    this.historyService.getEvents().subscribe((events:IEvents[]) => {
      currentValue = events;

      this.currentData = new MatTableDataSource(events);
    });

    this.historyService.getCategories().subscribe((category:ICategories[]) => {
      for (let cat of category) {
        for (let event of currentValue) {
          cat.id === event.category ? event.category = cat.name : null;
        }
      }
    })
    console.log(this.currentData)
    console.log(currentValue)

  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentData.filter = filterValue.trim().toLowerCase();
  }
}

