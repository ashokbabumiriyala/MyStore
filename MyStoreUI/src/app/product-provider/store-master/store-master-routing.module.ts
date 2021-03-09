import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreMasterPage } from './store-master.page';

const routes: Routes = [
  {
    path: '',
    component: StoreMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreMasterPageRoutingModule {}
