import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceOrdersPageRoutingModule } from './service-orders-routing.module';
import {ServiceOrderItemsComponent}  from '../service-orders/service-order-items/service-order-items.component';
import { ServiceOrdersPage } from './service-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceOrdersPageRoutingModule
  ],
  declarations: [ServiceOrdersPage,ServiceOrderItemsComponent]
  ,
  exports:[ServiceOrderItemsComponent]
})
export class ServiceOrdersPageModule {}
