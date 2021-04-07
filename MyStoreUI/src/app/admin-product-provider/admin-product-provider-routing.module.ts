import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminProductProviderPage } from './admin-product-provider.page';

const routes: Routes = [
  {
    path: '',
    component: AdminProductProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProductProviderPageRoutingModule {}
