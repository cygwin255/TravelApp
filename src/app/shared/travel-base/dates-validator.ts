import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ngbDateStructToDate } from '../../utils';

export function datesValidator(control: AbstractControl): boolean {
  const startDate = control.get('startDate');
  const endDate = control.get('endDate');

  if (!startDate.value || !endDate.value) {
    return;
  }

  return ngbDateStructToDate(startDate.value).getTime() <= ngbDateStructToDate(endDate.value).getTime();
}

export function createCompareWithValidator(name: string, compareWithControl: AbstractControl,
                                           invalidFunc: (self: any, compareWith: any) => boolean): ValidatorFn {
  return function (control: AbstractControl) {
    if (!control.value || !compareWithControl.value) {
      return;
    }

    if (invalidFunc(control.value, compareWithControl.value)) {
      const error = {};
      error[name] = false;

      return error;
    }
  };
}
