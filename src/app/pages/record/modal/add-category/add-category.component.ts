import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecordService } from '../../record.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private recordService: RecordService,
    private dialogRef: MatDialogRef<AddCategoryComponent>
  ) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      capacity: new FormControl(null, [Validators.required])
    })
  }

  public addCategory(): void {
    if (this.form.valid) {
      this.recordService.addNewCategory(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.close(true);
        })
    }
  }

  public close(isAdded: boolean): void {
    this.dialogRef.close(isAdded);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
