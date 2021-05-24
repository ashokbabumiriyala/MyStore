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
import { ExcutiveOrdersTableComponent } from './excutive-orders-table/excutive-orders-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreOrdersPageModule}  from '../store-orders/store-orders.module';

@NgModule({
  imports: [
    CommonModule,    
    ReactiveFormsModule,
    IonicModule,
    DeliveryManagementPageRoutingModule,
    IonicSelectableModule,
    StoreOrdersPageModule,
    FormsModule
  ],
  declarations: [DeliveryManagementPage, AddExecutiveComponent, 
    MangementOrdersTableComponent, DeliveryFeeComponent, 
    ExcutiveOrdersTableComponent

]
})
export class DeliveryManagementPageModule {}
