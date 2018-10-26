import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointsService } from '../endpoints-service/endpoints.service';
import { IAutoDropdownItem } from '../auto-dropdown/auto-dropdown.component';
import { datesValidator } from './dates-validator';

export abstract class TravelBase {
  form: FormGroup;

  protected constructor(private fb: FormBuilder,
                        private endpoints: EndpointsService) {
  }

  buildFormGroup(additionalItems: Object) {
    this.form = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      ...additionalItems
    });
  }

  reset() {
    this.form.reset();
  }

  validate(): boolean {
    if (!this.form.valid) {
      Object.values(this.form.controls).forEach(control => control.markAsTouched());
      return false;
    }

    return true;
  }

  getCitiesObservable = (searchPattern: string) => {
    return this.endpoints.fetchCities(searchPattern)
      .map(cities => {
        return cities.map(item => (
          <IAutoDropdownItem>{
            name: item.city,
            data: item.state
          })
        );
      });
  };
}
