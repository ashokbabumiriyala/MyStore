import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceDeliveryManagmentPageRoutingModule } from './service-delivery-managment-routing.module';

import { ServiceDeliveryManagmentPage } from './service-delivery-managment.page';
import {ServiceOrdersPageModule} from '../service-orders/service-orders.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceDeliveryManagmentPageRoutingModule,
    ServiceOrdersPageModule
  ],
  declarations: [ServiceDeliveryManagmentPage]
})
export class ServiceDeliveryManagmentPageModule {}
