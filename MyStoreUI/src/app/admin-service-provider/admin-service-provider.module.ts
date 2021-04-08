import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminServiceProviderPageRoutingModule } from './admin-service-provider-routing.module';

import { AdminServiceProviderPage } from './admin-service-provider.page';
import { RowExpandAccordianComponent } from '../row-expand-accordian/row-expand-accordian.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminServiceProviderPageRoutingModule
  ],
  declarations: [AdminServiceProviderPage, RowExpandAccordianComponent]
})
export class AdminServiceProviderPageModule {}
