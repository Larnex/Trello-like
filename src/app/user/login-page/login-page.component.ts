import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // inject AngularFireAuth to check auth state in the template for showing the button if user's not logged in
  // public keyword allows using service in the template
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

}
