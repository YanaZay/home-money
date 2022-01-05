import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategories } from '../../../../shared/types/categories.interface';
import { RecordService } from '../../record.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { category: ICategories; categoryArray: ICategories[] },
    private recordService: RecordService,
    private dialogRef: MatDialogRef<EditCategoryComponent>
  ) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public editCategory(): void {
    const id = this.form.value.categoryId;
    if (this.form.valid) {
      delete this.form.value.categoryId;

      this.recordService
        .editCategory(id, this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.close(true);
        });
    }
  }

  public close(isEdited: boolean): void {
    this.dialogRef.close(isEdited);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      categoryId: new FormControl(this.data.category.id),
      name: new FormControl(this.data.category.name, [Validators.required]),
      capacity: new FormControl(this.data.category.capacity, [
        Validators.required,
      ]),
    });

    this.form
      .get('categoryId')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        const category = this.data.categoryArray.find(
          (category: ICategories) => category.id === value
        )!;
        this.changeValue(category);
      });
  }

  private changeValue(category: ICategories): void {
    this.form.patchValue(category);
  }
}
