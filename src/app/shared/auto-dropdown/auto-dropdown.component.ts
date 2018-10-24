import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessorBase } from '../controlValueAccessorBase/controlValueAccessorBase';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-autodropdown',
  templateUrl: './auto-dropdown.component.html',
  styleUrls: ['./auto-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AutoDropdownComponent),
    }
  ]
})
export class AutoDropdownComponent extends ControlValueAccessorBase<IAutoDropdownItem> implements OnInit {
  @Input() caption: string;
  @Input() placeholder: string;
  @Input() items: Array<IAutoDropdownItem>;
  @Input() itemsObservableFunction: (search: string) => Observable<Array<IAutoDropdownItem>>;
  @Input() searchOnPlainItems = false;
  @Input() displayTemplate: TemplateRef<any>;

  @ViewChild('dropdownInstance') dropdownInstance: NgbDropdown;

  searchValue: string;
  displayObservable: Observable<Array<IAutoDropdownItem>>;

  ngOnInit() {
    this.getItemsToDisplay();
  }

  writeValue(item: IAutoDropdownItem) {
    if (!item) {
      this.searchValue = null;
      this.getItemsToDisplay();
    }

    super.writeValue(item);
  }

  selectItem(item: IAutoDropdownItem) {
    this.value = item;
    this.onChange(item);
    this.searchValue = item.name;
  }

  openDropdown() {
    if (!this.dropdownInstance.isOpen()) {
      this.dropdownInstance.open();
    }
  }

  onBlur() {
    this.onTouched();

    if (this.value && this.searchValue !== this.value.name) {
      this.searchValue = this.value.name;
    }
  }

  getItemsToDisplay(): Observable<Array<IAutoDropdownItem>> {
    if (this.items) {
      if (!this.searchValue || !this.searchOnPlainItems) {
        this.displayObservable = Observable.of(this.items);
        return;
      }

      this.displayObservable = Observable.of(this.items.filter(x => x.name.includes(this.searchValue)));
    } else {
      this.displayObservable = this.itemsObservableFunction(this.searchValue);
    }
  }
}

export interface IAutoDropdownItem {
  id?: number;
  name?: string;
  data?: any;
}
