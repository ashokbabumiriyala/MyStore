import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminProductProviderPageRoutingModule } from './admin-product-provider-routing.module';

import { AdminProductProviderPage } from './admin-product-provider.page';
import { RowExpandAccordianComponent } from '../row-expand-accordian/row-expand-accordian.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminProductProviderPageRoutingModule
  ],
  declarations: [AdminProductProviderPage,RowExpandAccordianComponent]
})
export class AdminProductProviderPageModule {}
