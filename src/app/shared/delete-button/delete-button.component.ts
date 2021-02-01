// Delete component as a shared component for deleting whatever object

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
  // The user will need to click the delete button twice in order to delete
  // canDelete tells user when to emit the event to the parent component
  canDelete!: boolean;

  // custom event
  @Output() delete = new EventEmitter<boolean>();


  prepareForDelete() {
    this.canDelete = true;
  }

  cancel() {
    this.canDelete = false;
  }

  deleteBoard() {
    // listen to custom event handler
    this.delete.emit(true);
    this.canDelete = false;
  }

}
