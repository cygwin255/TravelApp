import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HistoryType, ICarsSearch, IFlightSearch, IHistoryItem, IHotelsSearch } from './travel-history.model';

const STORAGE_NAME = 'history';

@Injectable()
export class TravelHistoryService {
  private historyChanged: BehaviorSubject<Array<any>>;
  historyChanged$: Observable<Array<any>>;

  constructor() {
    this.historyChanged = new BehaviorSubject<Array<any>>(this.getStorage());
    this.historyChanged$ = this.historyChanged.asObservable();
  }

  add(type: HistoryType, data: IFlightSearch | IHotelsSearch | ICarsSearch) {
    const storage = this.getStorage();

    storage.unshift(<IHistoryItem>{
      type,
      data
    });

    this.historyChanged.next(storage);
    this.save(storage);
  }

  getStorage() {
    return this.load() || [];
  }

  remove(id: number) {
    const storage = this.load();

    if (!storage) {
      throw new Error('Cannot remove item from empty travel-history!');
    }

    storage.splice(id, 1);
    this.historyChanged.next(storage);
    this.save(storage);
  }

  private load() {
    const data = localStorage.getItem(STORAGE_NAME);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  private save(data: any) {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
  }
}
