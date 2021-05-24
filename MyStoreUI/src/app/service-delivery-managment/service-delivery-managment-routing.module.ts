import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceDeliveryManagmentPage } from './service-delivery-managment.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceDeliveryManagmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceDeliveryManagmentPageRoutingModule {}
