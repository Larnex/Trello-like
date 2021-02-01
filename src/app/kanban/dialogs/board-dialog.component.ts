// This dialog will be used for the user to create a new board

// Component created using Angular CLI command:
// ng g c kanban/dialogs/board-dialog --flat --entry-component -t -s

// all dialogs will be in a single directory called "dialogs"
// --entry-component put component in an entryComponent array
// --flat will generate component without a folder
// -s -t = inline stylesheet and template

import { Component, Inject } from '@angular/core';
// import material dialogs
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  template: `
    <h1 mat-dialog-title>Board</h1>
    <div mat-dialog-content>
      <p>What shall we call this board?</p>
        <mat-form-field>
        <!-- pass title to dialog data object -->
          <input placeholder="title" matInput [(ngModel)]="data.title" />
        </mat-form-field>
    </div>
    <!-- delete button -->
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()" >Cancel</button>
      <!-- on close save input value in data object -->
      <button mat-button [mat-dialog-close]="data.title" cdkFocusInitial>
        Create
      </button>
    </div>
  `,
  styles: [
  ]
})
export class BoardDialogComponent{

  // inject MatDialogRef
  // dialogRef is the controller for dialog itself
  constructor(public dialogRef: MatDialogRef<BoardDialogComponent>,
    // MAT_DIALOG_DATA To pass data in dialog and passed modified data back at the dialog when the user closes it
    // data is like vanilla JS object
    @Inject(MAT_DIALOG_DATA) public data: any) { }


    // close the dialog when the user clicks outside of it
    onNoClick(): void {
      this.dialogRef.close();
    }

}
