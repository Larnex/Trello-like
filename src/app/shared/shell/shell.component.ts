// Shell component is navigation shell for the entire app

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  // Breakpoints is object contains media queries for each device; Breakpoints.Handset for smallest devices such as phone (max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)

  // this.breakpointObserver.observe([Breakpoints.Handset]) is observable object which is listening to user's viewport changes and has 2 keys breakpoints and matches. Breakpoints contains constant breakpoint which we pass as Breakpoints.Handset and matches is a boolean key which returns true if actual viewport is matching one of the breakpoints

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
    // get only matches which is boolean key
    map(result => result.matches),
    // shareReplay is using for subscribing to isHandset$ multiple times to make sure that we will listen to the most recent values
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
