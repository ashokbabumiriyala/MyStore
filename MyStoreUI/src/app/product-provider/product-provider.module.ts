import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductProviderPageRoutingModule } from './product-provider-routing.module';

import { ProductProviderPage } from './product-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductProviderPageRoutingModule
  ],
  declarations: [ProductProviderPage]
})
export class ProductProviderPageModule {}
