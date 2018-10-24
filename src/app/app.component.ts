import { Component } from '@angular/core';
import { EndpointsService } from './shared/endpoints-service/endpoints.service';
import { HistoryService } from './shared/history-service/history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [EndpointsService, HistoryService]
})
export class AppComponent {
}
