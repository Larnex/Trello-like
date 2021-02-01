// Shared module exports everything, consolidate all material imports in single file
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
// ShellComponent contains navigation shell for the entire app
import { ShellComponent } from './shell/shell.component';

// material modules
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { DeleteButtonComponent } from './delete-button/delete-button.component';

// array contains all components to import to export
const components = [
  ShellComponent,
  DeleteButtonComponent
];

// array contains all modules to import to export
const modules = [
  CommonModule,
  RouterModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
]


@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [
    ...components,
    ...modules
  ]
})
export class SharedModule { }
