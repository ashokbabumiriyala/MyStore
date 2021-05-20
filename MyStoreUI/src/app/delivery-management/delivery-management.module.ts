import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryManagementPageRoutingModule } from './delivery-management-routing.module';

import { DeliveryManagementPage } from './delivery-management.page';

import { AddExecutiveComponent } from './add-executive/add-executive.component';
import { MangementOrdersTableComponent } from './mangement-orders-table/mangement-orders-table.component';
import { DeliveryFeeComponent } from './delivery-fee/delivery-fee.component';
import { IonicSelectableModule } from 'ionic-selectable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryManagementPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [DeliveryManagementPage, AddExecutiveComponent, 
    MangementOrdersTableComponent, DeliveryFeeComponent]
})
export class DeliveryManagementPageModule {}
