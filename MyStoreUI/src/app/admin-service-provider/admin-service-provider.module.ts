import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminServiceProviderPageRoutingModule } from './admin-service-provider-routing.module';

import { AdminServiceProviderPage } from './admin-service-provider.page';
import { RowExpandServiceProviderComponent } from './row-expand-service-provider/row-expand-service-provider.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminServiceProviderPageRoutingModule
  ],
  declarations: [AdminServiceProviderPage, RowExpandServiceProviderComponent]
})
export class AdminServiceProviderPageModule {}
