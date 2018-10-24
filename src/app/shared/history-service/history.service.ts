import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const STORAGE_NAME = 'history';

@Injectable()
export class HistoryService {
  private historyChanged: BehaviorSubject<Array<any>>;
  historyChanged$: Observable<Array<any>>;

  constructor() {
    this.historyChanged = new BehaviorSubject<Array<any>>(this.getStorage());
    this.historyChanged$ = this.historyChanged.asObservable();
    console.log(this.getStorage());
  }

  add(type: HistoryType, data: IFlightTravel) {
    const storage = this.getStorage();

    storage.push(<IHistoryItem>{
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
      throw new Error('Cannot remove item from empty history!');
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

export enum HistoryType {
  FlightSearch,
  HotelSearch,
  CarSearch
}

export interface IHistoryItem {
  type: HistoryType;
  data: IFlightTravel;
}

export interface ITravelBase {
  startDate: Date;
  endDate: Date;
}

export interface IFlightTravel extends ITravelBase {
  origin: string;
  destination: string;
}
