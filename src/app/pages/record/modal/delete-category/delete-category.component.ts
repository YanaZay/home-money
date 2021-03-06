import { Component, Inject, OnDestroy } from '@angular/core';
import { RecordService } from '../../record.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategories } from '../../../../shared/models/categories.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICategories,
    private recordService: RecordService,
    private dialogRef: MatDialogRef<DeleteCategoryComponent>,
  ) {}

  public deleteCategory(): void {
    this.recordService.deleteCategory(this.data.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
      this.close(true);
    });
  }

  public close(isClosed: boolean): void {
    this.dialogRef.close(isClosed);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
