import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: PostCreateComponent
  },
  {
    path: 'edit/:id',
    component: PostCreateComponent
  },

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
