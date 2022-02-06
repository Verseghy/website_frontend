import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MenuItem } from '../../models/menu-item'

@Component({
  selector: 'verseghy-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() data: MenuItem[]

  dropdownOpen = false

  constructor() {}

  keyup(event: KeyboardEvent) {
    if (event.code !== 'Enter') return

    this.dropdownOpen = !this.dropdownOpen
  }
}
