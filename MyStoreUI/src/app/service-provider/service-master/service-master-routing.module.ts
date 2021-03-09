import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceMasterPage } from './service-master.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceMasterPageRoutingModule {}
