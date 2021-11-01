import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategories } from '../../../../shared/models/categories.interface';
import { HistoryService } from '../../../history/history.service';
import { RecordService } from '../../record.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  public form!: FormGroup;
  public categoryArray!: ICategories[];
  public value!: ICategories;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICategories,
    private historyService: HistoryService,
    private recordService: RecordService,
    private dialogRef: MatDialogRef<EditCategoryComponent>
  ) {}

  public ngOnInit(): void {
    this.getDataCategory();
    this.assignData();
  }

  public assignData(): void {
    if (this.data) {
      this.value = Object.assign({}, this.data)
      this.buildForm();
    }
  }

  public getDataCategory(): void {
    this.historyService.getCategories().subscribe(data => {
      this.categoryArray = data;
    })
  }

  public buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.value.name, [Validators.required]),
      capacity: new FormControl(this.value.capacity, [Validators.required])
    })
    console.log(this.value)
  }

  public editCategory(): void {
    if (this.form.valid) {
      this.recordService.editCategory(1, this.form.value).subscribe(() => {
        this.close(true);
      })
    }
  }

  public close(isEdited: boolean): void {
    this.dialogRef.close(isEdited);
  }
}
