import {NgModule} from '@angular/core';
import {AngularFireAuthModule} from '@angular/fire/auth';

import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    AngularFireAuthModule
  ],
  exports: [],
  declarations: [
    SigninComponent,
    SignupComponent,
    AuthComponent
  ],
  providers: [],
})
export class AuthModule {
}
