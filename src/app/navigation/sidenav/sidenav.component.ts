import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';

import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'todo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter();
  isAuth = false;
  authSub: Subscription;
  nameSub: Subscription;
  userName: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authSub = this.authService.isAuthChange.subscribe(isAuth => {
      this.isAuth = isAuth;
    });
    this.nameSub = this.authService.isUserNameChanged.subscribe(name => {
      this.userName = name;
    });
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    if (this.nameSub) {
      this.nameSub.unsubscribe();
    }
  }
}
