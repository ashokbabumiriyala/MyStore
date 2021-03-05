import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MystoreSlidesPageRoutingModule } from './mystore-slides-routing.module';

import { MystoreSlidesPage } from './mystore-slides.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MystoreSlidesPageRoutingModule
  ],
  declarations: [MystoreSlidesPage]
})
export class MystoreSlidesPageModule {}
