import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreOrdersPageRoutingModule } from './store-orders-routing.module';

import { StoreOrdersPage } from './store-orders.page';
import { StoreOrderItemsComponent } from './store-order-items/store-order-items.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreOrdersPageRoutingModule
  ],
  declarations: [StoreOrdersPage,StoreOrderItemsComponent]
})
export class StoreOrdersPageModule {}
