import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceMasterPageRoutingModule } from './service-master-routing.module';

import { ServiceMasterPage } from './service-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceMasterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ServiceMasterPage]
})
export class ServiceMasterPageModule {}
