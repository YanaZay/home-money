import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HistoryService } from '../../../history.service';
import { IEvents } from '../../../../../shared/types/events.interface';
import { ICategories } from '../../../../../shared/types/categories.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  public id!: number;
  public currentEvent!: IEvents;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private historyService: HistoryService
  ) {}

  public ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.id = params ? +params.id : null!;
        this.historyService.changeHistoryTitle.next(this.id);
      });
    this.getEvent();
  }

  public getEvent(): void {
    if (this.id) {
      this.historyService
        .getEvents()
        .pipe(takeUntil(this.destroy$))
        .subscribe((events: IEvents[]) => {
          this.currentEvent = events.find(({ id }) => id === this.id)!;
          this.getCategories();
        });
    }
  }

  public getCategories(): void {
    if (this.currentEvent) {
      this.historyService
        .getCategories()
        .pipe(takeUntil(this.destroy$))
        .subscribe((categories: ICategories[]) => {
          for (let cat of categories) {
            this.currentEvent.category === cat.id
              ? (this.currentEvent.category = cat.name)
              : null;
          }
        });
    }
  }

  public ngOnDestroy(): void {
    this.historyService.changeHistoryTitle.next(0);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
