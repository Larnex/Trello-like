// most complex module in this project. Responsible for add tasks, options for task, contains drag and drop feature

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
// import shared module which contains all material modules and shell component (navbar)
import { SharedModule } from '../shared/shared.module';
// import forms module for making forms
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';
import { BoardDialogComponent } from './dialogs/board-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog.component';


@NgModule({
  declarations: [BoardListComponent, BoardComponent, BoardDialogComponent, TaskDialogComponent],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    SharedModule,
    FormsModule,
    // add several material modules which will be used only in this module:
    // drag and drop feature
    DragDropModule,
    // open modal dialogs
    MatDialogModule,
    // toggle button
    MatButtonToggleModule

  ],
  // Since dialog components will not be using routes and not declared in html - it's needed to add them in entryComponents array. This array allows components to be registered in app and load dynamically through services
  entryComponents: [BoardDialogComponent, TaskDialogComponent]
})
export class KanbanModule { }
