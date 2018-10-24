import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelState } from './travel-state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { IAutoDropdownItem } from '../shared/auto-dropdown/auto-dropdown.component';
import { TravelBase } from '../shared/travel-base/travel-base';
import { EndpointsService } from '../shared/endpoints-service/endpoints.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html'
})
export class TravelComponent extends TravelBase {
  currentState: TravelState = TravelState.Flights;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              fb: FormBuilder,
              endpointsSevice: EndpointsService) {
    super(fb, endpointsSevice);
    this.route.data.subscribe(data => {
      if (data.state) {
        this.currentState = data.state;
      }
    });

    this.buildFormGroup({
      test: [null, Validators.required]
    });
  }

  search() {
    console.log(this.form.value);
  }

  itemsObservableFunction(name: string): Observable<Array<IAutoDropdownItem>> {
    const arr: Array<IAutoDropdownItem> = [];

    for (let i = 0; i < 100; i++) {
      arr.push(<IAutoDropdownItem>{
        id: i,
        name: `test${i}`
      });
    }


    let filteredArray = name ? arr.filter(x => x.name.includes(name)) : arr;
    filteredArray = filteredArray.slice(0, 10);


    const delayPromise: Promise<Array<IAutoDropdownItem>> = new Promise(resolve => {
      setTimeout(() => {
        resolve(filteredArray);
      }, 1000);
    });

    return Observable.fromPromise(delayPromise);
  }
}
