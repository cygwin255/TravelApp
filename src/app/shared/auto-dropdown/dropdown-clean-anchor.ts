import { NgbDropdownAnchor } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown';
import { Directive, forwardRef } from '@angular/core';

@Directive({
  selector: '[appDropdownCleanAnchor]',
  host: {
    'aria-haspopup': 'true',
    '[attr.aria-expanded]': 'dropdown.isOpen()'
  },
  providers: [{
    provide: NgbDropdownAnchor,
    useExisting: forwardRef(() => DropdownCleanAnchorDirective)
  }]
})
export class DropdownCleanAnchorDirective extends NgbDropdownAnchor {
}
