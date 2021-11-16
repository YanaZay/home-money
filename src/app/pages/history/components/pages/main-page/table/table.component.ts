import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IEvents } from '../../../../../../shared/models/events.interface';
import { HistoryService } from '../../../../history.service';
import { ICategories } from '../../../../../../shared/models/categories.interface';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from '../../../../../record/modal/add-event/add-event.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  @Output() public onCard: EventEmitter<IEvents> = new EventEmitter<IEvents>();
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @Inject(MAT_DIALOG_DATA) public data!: ICategories[];
  public eventArray!: IEvents[];
  public categoryArray!: ICategories[];
  public dataSource!: MatTableDataSource<IEvents>;
  public displayedColumns: string[] = ['id', 'amount', 'date', 'category', 'type', 'action'];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private matDialog: MatDialog,
    private historyService: HistoryService
  ) {}

  public ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    forkJoin([
      this.historyService.getEvents(),
      this.historyService.getCategories()
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([events, categories]: [IEvents[], ICategories[]]) => {
        this.eventArray = events;
        this.categoryArray = categories;

        this.dataSource = new MatTableDataSource(events);
        this.dataSource.paginator = this.paginator;

        for (let category of categories) {
          for (let event of events) {
            category.id === event.category ? event.category = category.name : null;
          }
        }
      })
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public addNewEvent(): void {
    const dialogRef = this.matDialog.open<AddEventComponent>(AddEventComponent, {data: this.categoryArray});

    dialogRef.afterClosed()
      .subscribe(
        data => {
          if (data) {
            this.getData()
          }
        }
      )
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


