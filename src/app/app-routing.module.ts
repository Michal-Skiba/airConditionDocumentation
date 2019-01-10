import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOfWorksComponent } from "./list-of-works/list-of-works.component";
import { ConservationComponent } from "./conservation/conservation.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/list-of-works',
    pathMatch: 'full'
  },
  {
    path: 'list-of-works',
    component: ListOfWorksComponent
  },
  {
    path: 'conservation',
    component: ConservationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
