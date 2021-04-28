import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendNotificationPageRoutingModule } from './send-notification-routing.module';

import { SendNotificationPage } from './send-notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendNotificationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SendNotificationPage]
})
export class SendNotificationPageModule {}
