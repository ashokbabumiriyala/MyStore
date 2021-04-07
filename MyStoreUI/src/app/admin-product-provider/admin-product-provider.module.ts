import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminProductProviderPageRoutingModule } from './admin-product-provider-routing.module';

import { AdminProductProviderPage } from './admin-product-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminProductProviderPageRoutingModule
  ],
  declarations: [AdminProductProviderPage]
})
export class AdminProductProviderPageModule {}
