import './rxjs-extensions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { AutoDropdownComponent } from './shared/auto-dropdown/auto-dropdown.component';
import { FlightsTravelComponent } from './travel/flights-travel/flights-travel.component';
import { EndpointsService } from './shared/endpoints-service/endpoints.service';
import { TravelWrapperComponent } from './shared/travel-wrapper/travel-wrapper.component';
import { TravelHistoryService } from './shared/travel-history-service/travel-history.service';
import { TravelHistoryComponent } from './travel-history/travel-history.component';
import { HotelsTravelComponent } from './travel/hotels-travel/hotels-travel.component';
import { DropdownCleanAnchorDirective } from './shared/auto-dropdown/dropdown-clean-anchor';
import { CarsTravelComponent } from './travel/cars-travel/cars-travel.component';


const appRoutes: Routes = [
  {
    path: 'flights',
    component: FlightsTravelComponent
  },
  {
    path: 'hotels',
    component: HotelsTravelComponent
  },
  {
    path: 'cars',
    component: CarsTravelComponent
  },
  {
    path: '**',
    redirectTo: '/flights'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
    AutoDropdownComponent,
    FlightsTravelComponent,
    TravelWrapperComponent,
    TravelHistoryComponent,
    HotelsTravelComponent,
    DropdownCleanAnchorDirective,
    CarsTravelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false, useHash: true }),
    NgbModule.forRoot()
  ],
  providers: [EndpointsService, TravelHistoryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
