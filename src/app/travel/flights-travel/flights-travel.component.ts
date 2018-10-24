import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelBase } from '../../shared/travel-base/travel-base';
import { EndpointsService } from '../../shared/endpoints-service/endpoints.service';
import { HistoryService, HistoryType, IFlightTravel } from '../../shared/history-service/history.service';
import { ngbDateStructToDate } from '../../utils';

@Component({
  selector: 'app-flights-travel',
  templateUrl: './flights-travel.component.html'
})
export class FlightsTravelComponent extends TravelBase {
  form: FormGroup;

  constructor(fb: FormBuilder,
              endpointsSevice: EndpointsService,
              private historyService: HistoryService) {
    super(fb, endpointsSevice);
    this.buildFormGroup({
      origin: [null, Validators.required],
      destination: [null, Validators.required]
    });
  }

  search() {
    if (!this.validate()) {
      return;
    }

    const formValue = this.form.value;

    this.historyService.add(HistoryType.FlightSearch, <IFlightTravel>{
      startDate: ngbDateStructToDate(formValue.startDate),
      endDate: ngbDateStructToDate(formValue.endDate),
      origin: formValue.origin.name,
      destination: formValue.destination.name
    });
  }
}
