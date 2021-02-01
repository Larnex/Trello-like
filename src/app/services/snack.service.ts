// service for showing notifications to user
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// snack bar usually shows notification on the button of the page
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  // inject router and material snackbar
  constructor(private snackBar: MatSnackBar, private router: Router) { }

  // method which show to unlogged user a snackbar when user try to access routes for logged users
  authError() {
    // show snackbar with text in the first argument of open method
    // 2nd argument is action text (text of button to trigger an action)
    // 3rd argument - configuration options
    this.snackBar.open('You must be logged in', 'OK', {
      duration: 5000
    });

    // if user click on snackbar
    return this.snackBar._openedSnackBarRef
    // navigate to login page on action
    ?.onAction().pipe(
      tap(
        _ => this.router.navigate(['/login'])
      )
    )
    .subscribe()
  }
}
