import { AbstractControl } from '@angular/forms';
import { ngbDateStructToDate } from '../../utils';

export function datesValidator(control: AbstractControl): boolean {
  const startDate = control.get('startDate');
  const endDate = control.get('endDate');

  if (!startDate.value || !endDate.value) {
    return;
  }

  return ngbDateStructToDate(startDate.value).getTime() <= ngbDateStructToDate(endDate.value).getTime();
}
