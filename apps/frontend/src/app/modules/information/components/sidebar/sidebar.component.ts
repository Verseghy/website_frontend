import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { MenuItem } from '../../models/menu-item'
import { Router } from '@angular/router'
import { InformationFacade } from '../../state/information/information.facade'
import { animate, state, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'verseghy-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('dropdown', [
      state(
        'open',
        style({
          height: '100%',
        })
      ),
      state(
        'closed',
        style({
          height: '0',
        })
      ),
      transition('open <=> close', [
        animate(
          '300ms',
          style({
            height: '*',
          })
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  @Input() data: MenuItem[]

  dropdownOpen = false

  constructor(private router: Router, private informationFacade: InformationFacade) {}

  ngOnInit(): void {}

  loadPage(slug: string): void {
    this.informationFacade.queryPageBySlug(slug)
    this.router.navigate(['/information', slug])
  }
}
