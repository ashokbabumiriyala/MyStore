import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceLocationsPageRoutingModule } from './service-locations-routing.module';

import { ServiceLocationsPage } from './service-locations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceLocationsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ServiceLocationsPage]
})
export class ServiceLocationsPageModule {}
