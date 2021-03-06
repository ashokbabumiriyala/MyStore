import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductProviderPage } from './product-provider.page';

const routes: Routes = [
  {
    path: '',
    component: ProductProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductProviderPageRoutingModule {}
