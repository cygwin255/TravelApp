import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export function ngbDateStructToDate(ngbDate: NgbDateStruct): Date {
  return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
}
