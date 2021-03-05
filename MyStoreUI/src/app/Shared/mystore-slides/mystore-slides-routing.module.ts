import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MystoreSlidesPage } from './mystore-slides.page';

const routes: Routes = [
  {
    path: '',
    component: MystoreSlidesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MystoreSlidesPageRoutingModule {}
