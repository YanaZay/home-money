import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoryService } from '../history/history.service';
import { ICategories } from '../../shared/models/categories.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from './modal/add-event/add-event.component';
import { DeleteCategoryComponent } from './modal/delete-category/delete-category.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddCategoryComponent } from './modal/add-category/add-category.component';
import { EditCategoryComponent } from './modal/edit-category/edit-category.component';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit, OnDestroy {
  public start: number = 0;
  public dataSource!: ICategories[];
  public displayedColumns: string [] = ['id', 'name', 'capacity', 'button'];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private service: HistoryService,
    private matDialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this._getData();
  }

  public addNewEvent(): void {
    const dialogRef = this.matDialog.open<AddEventComponent>(AddEventComponent, {data: this.dataSource});

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
      data => {
        if(data) {
          this._getData();
        }
      }
    )
  }

  public deleteCategory(category: ICategories): void {
    const dialogRef = this.matDialog.open<DeleteCategoryComponent>(DeleteCategoryComponent, {data: category});

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
      data => {
        if (data) {
          this._getData()
        }
      }
    )
  }

  public addNewCategory(): void {
    const dialogRef = this.matDialog.open<AddCategoryComponent>(AddCategoryComponent);

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
      data => {
        if (data) {
          this._getData()
        }
      }
    )
  }

  public editCategory(category: ICategories): void {
    const dialogRef = this.matDialog.open<EditCategoryComponent>(EditCategoryComponent, {data: {category, categoryArray: this.dataSource}});
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this._getData()
      }
    })
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _getData(): void {
    this.service.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.dataSource = data;
      })
  }
}
