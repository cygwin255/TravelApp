import { ControlValueAccessor } from '@angular/forms';

export abstract class ControlValueAccessorBase<T> implements ControlValueAccessor {
  public value: T;

  writeValue(newValue: T) {
    this.value = newValue;
  }

  registerOnChange(fn: (_: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
     this.onTouched = fn;
   }

  onChange(_: T) {
  }

  onTouched() {
  }
}
