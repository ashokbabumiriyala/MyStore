import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceProviderPage } from './service-provider.page';
const routes: Routes = [
  {
    path: '',
    component: ServiceProviderPage
  },
  {
    path: 'service-master',
    loadChildren: () => import('./service-master/service-master.module').then( m => m.ServiceMasterPageModule)
  },
  {
    path: 'service-locations',
    loadChildren: () => import('./service-locations/service-locations.module').then( m => m.ServiceLocationsPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then( m => m.ServicesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProviderPageRoutingModule {}
