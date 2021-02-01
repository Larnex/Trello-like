import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  // inject angular fire auth service
  constructor(private afAuth: AngularFireAuth) { }

  // Listen to click event
  @HostListener('click')
  // method to handle event
  onclick() {
    // show popup google sign in window
    this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
  }
}
