import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelBase } from '../../shared/travel-base/travel-base';
import { EndpointsService } from '../../shared/endpoints-service/endpoints.service';
import { TravelHistoryService } from '../../shared/travel-history-service/travel-history.service';
import { ngbDateStructToDate } from '../../utils';
import { HistoryType, IFlightSearch } from '../../shared/travel-history-service/travel-history.model';
import { createCompareWithValidator } from '../../shared/travel-base/dates-validator';

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
      origin: null,
      destination: null
    });

    const originControl = this.form.get('origin');
    const destinationControl = this.form.get('destination');

    const originValidator = createCompareWithValidator('locationValid',
      destinationControl,
      (x, y) => x.name === y.name && x.data === y.data
    );

    const destinationValidator = createCompareWithValidator('locationValid',
      originControl,
      (x, y) => x.name === y.name && x.data === y.data
    );

    originControl.validator = Validators.compose([Validators.required, originValidator]);
    destinationControl.validator = Validators.compose([Validators.required, destinationValidator]);
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
