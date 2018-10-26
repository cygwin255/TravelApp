import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { datesValidator } from '../travel-base/dates-validator';

@Component({
  selector: 'app-travel-wrapper',
  templateUrl: './travel-wrapper.component.html'
})
export class TravelWrapperComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup;

  @ViewChild('startDateInstance') startDateInstance: DatepickerComponent;
  @ViewChild('endDateInstance') endDateInstance: DatepickerComponent;

  @Output() search = new EventEmitter();
  @Output() reset = new EventEmitter();

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.form.get('startDate').valueChanges.subscribe(() => {
      this.startDateInstance.close();
      this.endDateInstance.open();
    });

    this.form.get('endDate').valueChanges.subscribe(() => {
      if (datesValidator(this.form) === false) {
        this.form.patchValue({
          startDate: this.form.get('endDate').value
        });

        this.endDateInstance.close();
        this.startDateInstance.open();
      }
    });
  }
}
