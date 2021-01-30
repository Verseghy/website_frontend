import { Directive } from '@angular/core'

@Directive({
  selector: 'input[verseghyInput]',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'px-4 py-2 border focus:ring-1 ring-primary-600 border-gray-500 focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 rounded-md bg-transparent w-full',
  }
})
export class InputDirective {
}
