import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductProviderPage } from './product-provider.page';

const routes: Routes = [
  {
    path: '',
    component: ProductProviderPage
  },  {
    path: 'store-master',
    loadChildren: () => import('./store-master/store-master.module').then( m => m.StoreMasterPageModule)
  },
  {
    path: 'single-store',
    loadChildren: () => import('./single-store/single-store.module').then( m => m.SingleStorePageModule)
  },
  {
    path: 'store-products',
    loadChildren: () => import('./store-products/store-products.module').then( m => m.StoreProductsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductProviderPageRoutingModule {}
