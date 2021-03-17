import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';

import { StoreMasterPageRoutingModule } from './store-master-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreMasterPage } from './store-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StoreMasterPageRoutingModule
  ],
  declarations: [StoreMasterPage]
})
export class StoreMasterPageModule {}
