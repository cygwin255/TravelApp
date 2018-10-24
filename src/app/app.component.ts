import { Component } from '@angular/core';
import { EndpointsService } from './shared/endpoints-service/endpoints.service';
import { TravelHistoryService } from './shared/travel-history-service/travel-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [EndpointsService, TravelHistoryService]
})
export class AppComponent {
}
