import { Directive } from '@angular/core';

@Directive({
  selector: '[verseghyDropdown]',
  exportAs: 'verseghyDropdown'
})
export class DropdownDirective {

  isOpen = false

  constructor() { }

}
