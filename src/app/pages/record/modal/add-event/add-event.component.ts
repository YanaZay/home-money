import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategories } from '../../../../shared/models/categories.interface';
import { RecordService } from '../../record.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICategories[],
    private dialogRef: MatDialogRef<AddEventComponent>,
    private recordService: RecordService,
  ) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public addNewEvent(): void {
    if (this.form.valid) {
      console.log(this.form.value)
      this.recordService.addNewEvent(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe( () => {
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

  private buildForm(): void {
    this.form = new FormGroup({
      category: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl(new Date())
    })
  }
}
