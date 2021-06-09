import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.page.html',
  styleUrls: ['./image-view.page.scss'],
})
export class ImageViewPage implements OnInit {
  @Input() imageUrl: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
