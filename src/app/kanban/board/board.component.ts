// child component for boards
import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardService } from '../board.service';
import { Board } from '../board.model';

// edit, add tasks
import { Task } from '../board.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  // passed board property from the parent component as an input argument
  @Input() board!: Board;

  // inject board service
  constructor(private boardService: BoardService, private dialog: MatDialog) { }

  // dragdrop event for tasks
  // happen when drag and drop task object inside board
  taskDrop(event: CdkDragDrop<string[]>) {
    // Event index is the index of draggable task in tasks array
    moveItemInArray(this.board.tasks!, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id!, this.board.tasks!);
  }

  // open dialog window
  // openDialog method contains 2 optional arguments: task and idx. task argument is passed to the method when user click on the existing task. If user click on add button openDialog will be called without any arguments, so task argument wouldn't exist
  openDialog(task?: Task, idx?: number): void {
    // new task will have purple label by default
    const newTask = { label: 'purple' };
    // open task dialog
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      // data if task is not new contains task object and add keys isNew: false and boardId and index. If new contains only purple label and key isNew: true
      data: task ? { task: { ...task }, isNew: false, boardId: this.board.id, idx } : { task: newTask, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // if add button was clicked
        if (result.isNew) {
          this.boardService.updateTasks(this.board.id!, [
            ...this.board.tasks!,
            result.task
          ]);
          // if existing task was clicked
        } else {
          // update contain all tasks of selected board
          const update = this.board.tasks;
          // splice is updating array of tasks
          // array.splice(index, howmany, item1, ....., itemX)
          update?.splice(result.idx, 1, result.task);
          this.boardService.updateTasks(this.board.id!, this.board.tasks!);
        }
      }
    })
  }

  // event handler for delete task
  handleDelete() {
    this.boardService.deleteBoard(this.board.id!);
  }
}
