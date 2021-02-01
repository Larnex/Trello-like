// created using Angular CLI command ng g g user/auth
// purpose of this guard to block access to certain routes if the user's not authenticated

// also show the snackbar notification if unlogged user try to access routes for logged user and redirect them to a login page

// guard is a service which implements CanActivate interface, it only can return boolean, observable or promise of a boolean
// if returns true means that user can access that route, false means route is blocked for user
// for auth's guards it's prefered to work in the context of a PROMISE because with promises can use async/await which tends to lead to more simplified code

// how to activate guard: 1. go to routing module  and find the route to block access 2. add to route object canActivate property and give it guard name as a value like this canActivate: [AuthGuard]
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // inject angularfireauth service and snack service
  constructor(
    private afAuth: AngularFireAuth,
    private snack: SnackService
  ) {

  }

  // transform canActivate method to async/await to ensure that it'll return a promise
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>  {
      // if user's logged in variable user will contain user's object
      const user = await this.afAuth.currentUser;

      // !!user transform user object to boolean if user variable contains user's object return true if not user varible will null so !!user would return false
      const isLoggedIn = !!user;

      // show snackbar using authError method from snack service if user's not logged in
      if (!isLoggedIn) {
        this.snack.authError();
      }

      // return user variable transformed to boolean
      return isLoggedIn;
  }

}
