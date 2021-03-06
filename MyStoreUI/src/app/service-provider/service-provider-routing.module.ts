import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceProviderPage } from './service-provider.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProviderPageRoutingModule {}
