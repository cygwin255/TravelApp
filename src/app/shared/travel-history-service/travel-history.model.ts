export enum HistoryType {
  FlightSearch,
  HotelSearch,
  CarSearch
}

export interface IHistoryItem {
  type: HistoryType;
  data: IFlightSearch | IHotelsSearch | ICarsSearch;
}

export interface ISearchBase {
  startDate: Date;
  endDate: Date;
}

export interface IFlightSearch extends ISearchBase {
  origin: string;
  destination: string;
}

export interface IHotelsSearch extends ISearchBase {
  rating: number;
  location: string;
}

export interface ICarsSearch extends ISearchBase {
  type: string;
  location: string;
}
