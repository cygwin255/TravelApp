import './rxjs-extensions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TravelComponent } from './travel/travel.component';
import { TravelState } from './travel/travel-state';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { AutoDropdownComponent } from './shared/auto-dropdown/auto-dropdown.component';
import { FlightsTravelComponent } from './travel/flights-travel/flights-travel.component';
import { EndpointsService } from './shared/endpoints-service/endpoints.service';
import { TravelWrapperComponent } from './shared/travel-wrapper/travel-wrapper.component';
import { HistoryService } from './shared/history-service/history.service';
import { HistoryComponent } from './history/history.component';


const appRoutes: Routes = [
  {
    path: 'flights',
    component: FlightsTravelComponent,
  },
  {
    path: 'hotels',
    component: TravelComponent,
    data: {
      state: TravelState.Hotels
    }
  },
  {
    path: 'cars',
    component: TravelComponent,
    data: {
      state: TravelState.Cars
    }
  },
  {
    path: '**',
    redirectTo: '/flights'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    TravelComponent,
    DatepickerComponent,
    AutoDropdownComponent,
    FlightsTravelComponent,
    TravelWrapperComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  providers: [EndpointsService, HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
