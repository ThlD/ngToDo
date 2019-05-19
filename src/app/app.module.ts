import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavComponent} from './navigation/sidenav/sidenav.component';
import {MaterialModule} from './shared/modules/material.module';
import {TodolistModule} from './todolist/todolist.module';
import {TaskService} from './todolist/shared/services/task.service';
import {environment} from '../environments/environment';
import {AuthService} from './auth/auth.service';
import {UiService} from './shared/services/ui.service';
import {ThemeService} from './shared/services/theme.service';

@NgModule({
  declarations: [AppComponent, WelcomePageComponent, HeaderComponent, SidenavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AuthModule,
    TodolistModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [TaskService, AuthService, UiService, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
