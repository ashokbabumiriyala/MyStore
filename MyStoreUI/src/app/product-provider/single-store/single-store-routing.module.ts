import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleStorePage } from './single-store.page';

const routes: Routes = [
  {
    path: '',
    component: SingleStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleStorePageRoutingModule {}
