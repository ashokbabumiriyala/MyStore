import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductProviderPageRoutingModule } from './product-provider-routing.module';

import { ProductProviderPage } from './product-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductProviderPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [ProductProviderPage]
})
export class ProductProviderPageModule {}
