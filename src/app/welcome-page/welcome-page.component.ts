import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'todo-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  isAuth = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.isAuth = this.authService.isAuth();
  }
}
