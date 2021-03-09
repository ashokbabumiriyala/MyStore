import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleStorePageRoutingModule } from './single-store-routing.module';

import { SingleStorePage } from './single-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleStorePageRoutingModule
  ],
  declarations: [SingleStorePage]
})
export class SingleStorePageModule {}
