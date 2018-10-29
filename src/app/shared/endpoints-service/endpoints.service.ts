import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CitiesArray } from './cities';

const Cities = CitiesArray.map(item => `${item.city} (${item.state})`);

@Injectable()
export class EndpointsService {
  fetchCities(searchPattern: string): Observable<Array<any>> {

    let filteredArray = searchPattern
      ? Cities.filter(
        x => x
          .toLowerCase()
          .includes(searchPattern.toLocaleLowerCase())
      )
      : Cities;
    filteredArray = filteredArray.slice(0, 10);

    const delayPromise: Promise<Array<any>> = new Promise(resolve => {
      setTimeout(() => {
        resolve(filteredArray);
      }, 333);
    });

    return Observable.fromPromise(delayPromise);
  }
}
