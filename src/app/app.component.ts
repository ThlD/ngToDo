import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {AuthService} from './auth/auth.service';
import {ThemeService} from './shared/services/theme.service';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  checkboxState: boolean;
  themeSub: Subscription;

  constructor(private authService: AuthService,
              private themeService: ThemeService) {
  }

  ngOnInit() {
    this.checkboxState = this.themeService.getCheckboxState();
    this.authService.initAuthListener();
  }

  ngAfterViewInit() {
    this.themeSub = this.themeService.onCheckboxChanged.subscribe(state => this.checkboxState = state);
  }

  onSidenavToggle(sidenav) {
    sidenav.toggle();
  }

  closeSidenav(sidenav) {
    sidenav.close();
  }

  ngOnDestroy() {
    if (this.themeSub) {
      this.themeSub.unsubscribe();
    }
  }
}


