// Boards container, show all borders to user
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Board } from '../board.model';
import { BoardService } from '../board.service';
// import material dialog service and board dialog component which show dialog window when create new board
// Board List Component is the parent component for creating a new board
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards!: Board[];
  sub!: Subscription;

  constructor(public boardService: BoardService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // subscribe to observable board collection
    this.sub = this.boardService.getUserBoards().subscribe(boards => this.boards = boards);
  }

  ngOnDestroy(): void {
    // unsubscribe when component is destoyed (means if user navigate to another component or close the page)
    this.sub.unsubscribe();
  }

  // event handler when user drops items in a list
  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray imported from cdk which sort boards on front-end
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    // tide it to back-end as well
    // back-end sorting logic has been already implented in boardService method sortBoards
    this.boardService.sortBoards(this.boards)
  }

  // openBoardDialog is the event handler that will be fired on a button click and will open a dialog and also handled the changes to the data object after the dialog has been closed
  openBoardDialog(): void {
    // open dialog component
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      // data object is empty cause dialog should have no data when open it
      data: { }
    });

    // afterClosed() allows handled the changes to the data after the user has closed it
    // the result will be the data object in the dialog that we bound to [(ngModel)] in a dialog component
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardService.createBoard({
          title: result,
          priority: this.boards.length
        })
      }
    })

  }
}
