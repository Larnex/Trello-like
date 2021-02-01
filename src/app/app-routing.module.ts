import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomePageComponent, pathMatch: 'full'
  },
  // loadChildren method implements lazy loading for modules
  {
    path: 'login', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  // add auth guard to kanban module to make this module accessible only for logged users
  {
    path: 'kanban', loadChildren: () => import('./kanban/kanban.module').then(m => m.KanbanModule), canActivate:[AuthGuard]
  },
  // Lazy loaded customer module
  {
    path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
