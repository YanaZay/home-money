import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history/history.service';
import { ICategories } from '../../shared/models/categories.interface';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  public dataSource!: ICategories[];
  public displayedColumns: string [] = ['id', 'name', 'capacity', 'button'];

  constructor(
    private service: HistoryService
  ) {}

  public ngOnInit(): void {
    this.service.getCategories().subscribe(data => {
      this.dataSource = data;
      console.log(data)
    })
  }

}
