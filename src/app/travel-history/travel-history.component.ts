import { Component } from '@angular/core';
import { TravelHistoryService } from '../shared/travel-history-service/travel-history.service';
import { HistoryType } from '../shared/travel-history-service/travel-history.model';
@Component({
  selector: 'app-travel-history',
  templateUrl: './travel-history.component.html',
  styleUrls: ['./travel-history.component.scss']
})
export class TravelHistoryComponent {
  Array = Array;
  HistoryType = HistoryType;

  constructor(public historyService: TravelHistoryService) {
  }
}
