import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subject} from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';


import {AuthData} from './auth-data.model';
import {UiService} from '../shared/services/ui.service';

@Injectable()
export class AuthService {
  isAuthChange = new Subject<boolean>();
  isUserNameChanged = new Subject<string>();
  private isAuthenticated = false;
  private currentUserName = 'Guest';

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private uiService: UiService) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUserName = user.email.split('@')[0];
        this.isUserNameChanged.next(this.currentUserName);
        this.isAuthenticated = true;
        this.isAuthChange.next(true);
        this.router.navigate(['/todo']);
      } else {
        this.isAuthenticated = false;
        this.isAuthChange.next(false);
        this.isUserNameChanged.next('Guest');
        this.currentUserName = 'Guest';
        this.router.navigate(['/']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.isLoadingChange.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.uiService.isLoadingChange.next(false);
      })
      .catch(error => {
        this.uiService.isLoadingChange.next(false);
        this.uiService.showSnackbar(error.message, null, 4000);
      });
  }

  socialLoginByGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.socialLogin(provider);
  }

  socialLoginByGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    this.socialLogin(provider);
  }

  private socialLogin(provider) {
    firebase.auth().signInWithPopup(provider).catch(error => {
      this.uiService.showSnackbar(error.message, null, 4000);
    });
  }

  login(authData: AuthData) {
    this.uiService.isLoadingChange.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.uiService.isLoadingChange.next(false);
      })
      .catch(error => {
        this.uiService.isLoadingChange.next(false);
        this.uiService.showSnackbar(error.message, null, 4000);
      });
  }

  logout() {
    this.afAuth.auth.signOut()
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 4000);
      });
  }

  isAuth() {
    return this.isAuthenticated;
  }

  getUserName() {
    return this.currentUserName;
  }
}
