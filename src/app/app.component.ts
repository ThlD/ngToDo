import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {AuthService} from './auth/auth.service';
import {ThemeService} from './shared/services/theme.service';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkTheme: Observable<boolean>;

  constructor(private authService: AuthService,
              private themeService: ThemeService) {
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.authService.initAuthListener();
  }

  onSidenavToggle(sidenav) {
    sidenav.toggle();
  }

  closeSidenav(sidenav) {
    sidenav.close();
  }
}


