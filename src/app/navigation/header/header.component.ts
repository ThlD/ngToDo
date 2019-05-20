import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';

import {CreateTaskComponent} from '../../todolist/create-task/create-task.component';
import {TaskService} from '../../todolist/shared/services/task.service';
import {AuthService} from '../../auth/auth.service';
import {ThemeService} from '../../shared/services/theme.service';

@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter();
  isAuth = false;
  authSub: Subscription;
  nameSub: Subscription;
  userName: string;
  isTodoPage = false;
  checkboxState: boolean;
  enableDarkTheme: FormControl;

  constructor(private dialog: MatDialog,
              private taskService: TaskService,
              private authService: AuthService,
              private router: Router,
              private themeService: ThemeService
  ) {
  }

  ngOnInit() {
    this.checkboxState = this.themeService.getCheckboxState();
    this.enableDarkTheme = new FormControl(this.checkboxState);

    this.authSub = this.authService.isAuthChange.subscribe(isAuth => {
      this.isAuth = isAuth;
    });
    this.nameSub = this.authService.isUserNameChanged.subscribe(name => {
      this.userName = name;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isTodoPage = event.url === '/todo';
      }
    });
  }

  toggleDarkTheme(state: boolean) {
    this.themeService.setDarkTheme(state);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newTask = {
          name: result.name,
          description: result.description,
          isDone: false,
          date: new Date(),
          priority: result.priority,
          tagColor: result.tagColor,
          ownerLetter: this.userName.substr(0, 1)
        };
        this.taskService.addTask(newTask);
      }
    });
  }

  onSidenavToggle() {
    this.sidenavToggle.emit();
  }

  onLogout() {
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
