import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { ThemingService } from '../services/core/theming.service';
import { HandsetService } from '../services/handset.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private navigationService: NavigationService,
    private handsetService: HandsetService) { }

  @Input()
  darkMode!: boolean | null;

  @Output()
  toggleDarkEvent = new EventEmitter<boolean>();
  toggleDarkMode() {
    this.toggleDarkEvent.emit(!this.darkMode);
  }
  toggleSide() {
    this.navigationService.toggle()
  }
  isSmallScreen$ = this.handsetService.isScreenSmall$
  isSideShown$ = this.navigationService.showNav$
    .pipe(shareReplay(1));


  ngOnInit(): void {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {

          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target?.classList.toggle('is-active');

        });
      });
    }
  }

}
