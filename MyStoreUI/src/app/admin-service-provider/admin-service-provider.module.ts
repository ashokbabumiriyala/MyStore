import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminServiceProviderPageRoutingModule } from './admin-service-provider-routing.module';

import { AdminServiceProviderPage } from './admin-service-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminServiceProviderPageRoutingModule
  ],
  declarations: [AdminServiceProviderPage]
})
export class AdminServiceProviderPageModule {}
