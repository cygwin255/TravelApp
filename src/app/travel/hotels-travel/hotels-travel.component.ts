import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelBase } from '../../shared/travel-base/travel-base';
import { EndpointsService } from '../../shared/endpoints-service/endpoints.service';
import { TravelHistoryService } from '../../shared/travel-history-service/travel-history.service';
import { IAutoDropdownItem } from '../../shared/auto-dropdown/auto-dropdown.component';
import { ngbDateStructToDate } from '../../utils';
import { HistoryType, IHotelsSearch } from '../../shared/travel-history-service/travel-history.model';

@Component({
  selector: 'app-hotels-travel',
  templateUrl: './hotels-travel.component.html'
})
export class HotelsTravelComponent extends TravelBase {
  Array = Array;
  form: FormGroup;
  ratings: Array<IAutoDropdownItem> = [];

  constructor(fb: FormBuilder,
              endpointsSevice: EndpointsService,
              private historyService: TravelHistoryService) {
    super(fb, endpointsSevice);

    this.buildFormGroup({
      location: [null, Validators.required],
      rating: [null, Validators.required]
    });

    for (let i = 1; i < 6; i++) {
      this.ratings.push({
        name: i !== 5 ? 'and higher' : 'stars',
        data: i
      });
    }
  }

  search() {
    if (!this.validate()) {
      return;
    }

    const formValue = this.form.value;

    this.historyService.add(HistoryType.HotelSearch, <IHotelsSearch>{
      startDate: ngbDateStructToDate(formValue.startDate),
      endDate: ngbDateStructToDate(formValue.endDate),
      location: formValue.location.name,
      rating: formValue.rating.data
    });
  }
}
