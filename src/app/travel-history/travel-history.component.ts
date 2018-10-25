import { Component, TemplateRef } from '@angular/core';
import { TravelHistoryService } from '../shared/travel-history-service/travel-history.service';
import { HistoryType } from '../shared/travel-history-service/travel-history.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-travel-history',
  templateUrl: './travel-history.component.html',
  styleUrls: ['./travel-history.component.scss']
})
export class TravelHistoryComponent {
  Array = Array;
  HistoryType = HistoryType;

  constructor(public historyService: TravelHistoryService,
              private modalService: NgbModal) {
  }

  openDeleteConfirmation(index: number, modal: TemplateRef<any>) {
    this.modalService.open(modal)
      .result
      .then((result) => {
        if (result) {
          this.historyService.remove(index);
        }
      }, () => {});
  }
}
