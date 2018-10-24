import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelBase } from '../../shared/travel-base/travel-base';
import { EndpointsService } from '../../shared/endpoints-service/endpoints.service';
import { TravelHistoryService } from '../../shared/travel-history-service/travel-history.service';
import { ngbDateStructToDate } from '../../utils';
import { HistoryType, IFlightSearch } from '../../shared/travel-history-service/travel-history.model';

@Component({
  selector: 'app-flights-travel',
  templateUrl: './flights-travel.component.html'
})
export class FlightsTravelComponent extends TravelBase {
  form: FormGroup;

  constructor(fb: FormBuilder,
              endpointsSevice: EndpointsService,
              private historyService: TravelHistoryService) {
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

    this.historyService.add(HistoryType.FlightSearch, <IFlightSearch>{
      startDate: ngbDateStructToDate(formValue.startDate),
      endDate: ngbDateStructToDate(formValue.endDate),
      origin: formValue.origin.name,
      destination: formValue.destination.name
    });
  }
}
