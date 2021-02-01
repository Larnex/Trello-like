import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  // FormGroup is the collection of inputs tied together and validated together with rxjs for reactiveness
  form!: FormGroup;

  // type variable determine which back-end method will invoke with firebase depending on what user's trying to do from the front-end
  type: 'login' | 'signup' | 'reset' = 'signup';
  // loading state
  loading = false;

  // serverMessage in most cases will be the error message from the firebase if the authentication method fails
  serverMessage!: string;

  // inject AngularFireAuth to actually authenticate user on the server
  // FormBuilder using for building the form
  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {}

  ngOnInit(): void {
    // fb.group takes an object with a form configuration
    // each property in this object represents form field in the form (email, pasword, password confirmation)
    this.form = this.fb.group({
      // each property takes an array.
      // 1st element of the array is the default value of form field (empty string in most cases)
      // 2nd element - an array which takes set of Validators
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
    });
  }

  // change type of the format user's trying to use
  changeType(val: any) {
    this.type = val;
  }

  // 3 getters to use in ngIf to show different elements based on the type of form that the user's going out
  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  // get the actual form controls of the reactive form
  // getters is using for convenient's sake cause i'll be using this.form.get("form control") a lot of times
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  // check if passwords are match
  get passwordIsMatch() {
    // i want to check password match only on signup
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password?.value === this.passwordConfirm?.value;
    }
  }

  // set up placeholder on onSubmit() will do back-end word when form's submitted
  async onSubmit() {
    // means that form is loading
    this.loading = true;
    // get input value of fields such as email, password
    const email = this.email?.value;
    const password = this.password?.value;

    // if any of the back-end calls failed - show the error message to the user in the UI
    try {
      if (this.isLogin) {
        // if user's in login state - do sign in with email and password
        await this.afAuth.signInWithEmailAndPassword(email, password);
      }
      // if user's in sign up state - create user's profile using angularfireauth method createUserWithEmailAndPassword(email, password)
      if (this.isSignup) {
        await this.afAuth.createUserWithEmailAndPassword(email, password);

        // pass 'Check your email' to serverMessage as the notification to user to check email
        this.serverMessage = 'Check your email';
      }

      // if user's in reset state - send password reset email using method sendPasswordResetEmail(email)
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
      }

    } catch (error) {
      // pass back-end error to serverMessage string variable
      // We have binded serverMessage in html as an error message to show
      this.serverMessage = error;
    }
  }
}
