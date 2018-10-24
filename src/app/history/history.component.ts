import { Component } from '@angular/core';
import { HistoryService, HistoryType, IFlightTravel, IHistoryItem } from '../shared/history-service/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  HistoryType = HistoryType;

  constructor(public historyService: HistoryService) {
  }
}
