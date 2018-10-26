import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CitiesArray } from './cities';

@Injectable()
export class EndpointsService {
  fetchCities(searchPattern: string): Observable<Array<any>> {
    let filteredArray = searchPattern
      ? CitiesArray.filter(
        x => x.city
          .toLowerCase()
          .includes(searchPattern.toLocaleLowerCase())
      )
      : CitiesArray;
    filteredArray = filteredArray.slice(0, 10);

    const delayPromise: Promise<Array<any>> = new Promise(resolve => {
      setTimeout(() => {
        resolve(filteredArray);
      }, 333);
    });

    return Observable.fromPromise(delayPromise);
  }
}
