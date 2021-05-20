import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';

class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-delivery-fee',
  templateUrl: './delivery-fee.component.html',
  styleUrls: ['./delivery-fee.component.scss'],
})
export class DeliveryFeeComponent implements OnInit {
  editPrice: boolean = false;
  ports: Port[];
  port: Port;
  editGroupPrice: boolean = false;
  constructor() { }

  ngOnInit() {
    this.ports = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];
  }
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
  editFee() {
    this.editPrice = true;
  }
  editGroupFee() {
    this.editGroupPrice = true;
  }
  saveGroupFee() {
    this.editGroupPrice = false
  }
  saveFee() {
    this.editPrice = false;
  }
}
