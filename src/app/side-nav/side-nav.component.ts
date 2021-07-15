import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { Observable } from 'rxjs';
import { SideNavDirection } from './side-nav-direction.enum';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {

  showSideNav$ = this.navService.showNav$
  @Input() sidenavTemplateRef: any;
  @Input() duration: number = 0.25;
  @Input() navWidth: number = window.innerWidth;
  @Input() direction: SideNavDirection = SideNavDirection.Left;

  constructor(private navService: NavigationService) { }

  get stringDirection() {
    return this.direction === SideNavDirection.Left ? 'left' : 'right';
  }
  ngOnInit(): void {

  }

  onSidebarClose() {
    this.navService.setShowNav(false);
  }

  getSideNavBarStyle(isShown: boolean | null) {
    let shown = isShown === null ? false : isShown;
    let navBarStyle: any = {};

    navBarStyle.transition = this.direction + ' ' + this.duration + 's, visibility ' + this.duration + 's';
    navBarStyle.width = this.navWidth;
    navBarStyle[this.stringDirection] = (shown ? 0 : (this.navWidth * -1)) + 'px';

    return navBarStyle;
  }
}