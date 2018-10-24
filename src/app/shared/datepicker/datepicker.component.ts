import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessorBase } from '../control-value-accessor-base/control-value-accessor-base';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { PlacementArray } from '@ng-bootstrap/ng-bootstrap/util/positioning';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'handleClick($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DatepickerComponent),
    }
  ]
})
export class DatepickerComponent extends ControlValueAccessorBase<NgbDateStruct> {
  @Input() caption: string;
  @Input() placeholder: string;
  @Input() placement: PlacementArray = 'bottom';

  @ViewChild('datepickerInstance') datepickerInstance: NgbInputDatepicker;

  constructor(private elementRef: ElementRef) {
    super();
  }

  onModelChange(event: NgbDateStruct) {
    this.onChange(event);

    setTimeout(() => {
      this.datepickerInstance.close();
    }, 0);
  }

  handleClick(event: any) {
    if (this.datepickerInstance.isOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.datepickerInstance.close();
    }
  }
}
