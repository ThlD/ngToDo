import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class ThemeService {
  onCheckboxChanged: Subject<boolean> = new Subject<boolean>();
  checkboxState: boolean;

  setDarkTheme(isDarkTheme: boolean) {
    this.onCheckboxChanged.next(isDarkTheme);
    this.checkboxState = isDarkTheme;
    window.localStorage.setItem('checkboxState', JSON.stringify(isDarkTheme));
  }

  getCheckboxState() {
    this.checkboxState = JSON.parse(window.localStorage.getItem('checkboxState'));
    this.onCheckboxChanged.next(this.checkboxState);
    return this.checkboxState;
  }



}
