import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IEvents } from '../../../../../../shared/models/events.interface';
import { HistoryService } from '../../../../history.service';
import { ICategories } from '../../../../../../shared/models/categories.interface';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  public eventArray!: IEvents[];
  public dataSource!: MatTableDataSource<IEvents>;
  public displayedColumns: string[] = ['id', 'amount', 'date', 'category', 'type', 'action'];
  private destroy$: Subject<void> = new Subject<void>();
  @Output() public onCard: EventEmitter<IEvents> = new EventEmitter<IEvents>();
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    private historyService: HistoryService
  ) {}

  public ngOnInit(): void {
    let currentValue: IEvents[] = [];
    this.historyService.getEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe((events:IEvents[]) => {
        this.eventArray = events;
        currentValue = events;

        this.dataSource = new MatTableDataSource(events);
        this.dataSource.paginator = this.paginator;
      }
    );

    this.historyService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories:ICategories[]) => {
      for (let category of categories) {
        for (let event of currentValue) {
          category.id === event.category ? event.category = category.name : null;
        }
      }
    })
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


