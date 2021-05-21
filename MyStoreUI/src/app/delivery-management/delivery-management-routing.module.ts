import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryManagementPage } from './delivery-management.page';

import { AddExecutiveComponent } from './add-executive/add-executive.component';
import { MangementOrdersTableComponent } from './mangement-orders-table/mangement-orders-table.component';
import { DeliveryFeeComponent } from './delivery-fee/delivery-fee.component';
import { ExcutiveOrdersTableComponent } from './excutive-orders-table/excutive-orders-table.component';

const routes: Routes = [
  {
    path: 'add-executive',
    component: AddExecutiveComponent
  },
  {
    path:'management-orders',
    component: MangementOrdersTableComponent
  },
  {
    path:'delivery-fee',
    component:DeliveryFeeComponent
  },
  {
    path:'executive-orders',
    component:ExcutiveOrdersTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryManagementPageRoutingModule {}
