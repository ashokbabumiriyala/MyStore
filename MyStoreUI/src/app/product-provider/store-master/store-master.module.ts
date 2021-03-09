import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreMasterPageRoutingModule } from './store-master-routing.module';

import { StoreMasterPage } from './store-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreMasterPageRoutingModule
  ],
  declarations: [StoreMasterPage]
})
export class StoreMasterPageModule {}
