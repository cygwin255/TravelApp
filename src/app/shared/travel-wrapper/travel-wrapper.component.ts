import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-travel-wrapper',
  templateUrl: './travel-wrapper.component.html'
})
export class TravelWrapperComponent {
  @Input() form: FormGroup;

  @Output() search = new EventEmitter();
  @Output() reset = new EventEmitter();
}
