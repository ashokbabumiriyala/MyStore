import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';

class Port {
  public id: number;
  public name: string;
  public edit: boolean;
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
  selectedStores: any = [];
  constructor() { }

  ngOnInit() {
    this.ports = [
      { id: 1, name: 'Tokai',edit:false},
      { id: 2, name: 'Vladivostok',edit:false},
      { id: 3, name: 'Navlakhi',edit:false}
    ];
  }
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.selectedStores = event.value;
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
  storeFeeEdit(store) {
    store.edit = true; 
  }
  storeFeeSave(store) {
    store.edit = false; 
  }
  storeFeeDelete(store) {
    console.log(store);
  }
}
