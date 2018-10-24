import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelBase } from '../../shared/travel-base/travel-base';
import { EndpointsService } from '../../shared/endpoints-service/endpoints.service';
import { TravelHistoryService } from '../../shared/travel-history-service/travel-history.service';
import { IAutoDropdownItem } from '../../shared/auto-dropdown/auto-dropdown.component';
import { ngbDateStructToDate } from '../../utils';
import { HistoryType, ICarsSearch } from '../../shared/travel-history-service/travel-history.model';

@Component({
  selector: 'app-cars-travel',
  templateUrl: './cars-travel.component.html'
})
export class CarsTravelComponent extends TravelBase {
  Array = Array;
  form: FormGroup;
  carTypes: Array<IAutoDropdownItem> = [
    { name: 'Any' },
    { name: 'Economy' },
    { name: 'Compact' },
    { name: 'Mid-size' },
    { name: 'Full-size' },
    { name: 'Premium' },
    { name: 'Luxury' },
    { name: 'Minivan' },
    { name: 'Convertible' }
  ];

  constructor(fb: FormBuilder,
              endpointsSevice: EndpointsService,
              private historyService: TravelHistoryService) {
    super(fb, endpointsSevice);

    this.buildFormGroup({
      location: [null, Validators.required],
      type: [null, Validators.required]
    });
  }

  search() {
    if (!this.validate()) {
      return;
    }

    const formValue = this.form.value;

    this.historyService.add(HistoryType.CarSearch, <ICarsSearch>{
      startDate: ngbDateStructToDate(formValue.startDate),
      endDate: ngbDateStructToDate(formValue.endDate),
      location: formValue.location.name,
      type: formValue.type.name
    });
  }
}
