import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminServiceProviderPage } from './admin-service-provider.page';

const routes: Routes = [
  {
    path: '',
    component: AdminServiceProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminServiceProviderPageRoutingModule {}
