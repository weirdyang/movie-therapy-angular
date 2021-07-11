import { Component } from '@angular/core';
import { ThemingService } from './services/core/theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bulma-angular';

  darkMode$ = this.themeService.darkMode$;


  constructor(private themeService: ThemingService) { }

  toggleDarkMode(setting: boolean) {
    this.themeService.setDarkPreference(setting);
  }
}
