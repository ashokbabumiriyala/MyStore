import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceLocationsPage } from './service-locations.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceLocationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceLocationsPageRoutingModule {}
