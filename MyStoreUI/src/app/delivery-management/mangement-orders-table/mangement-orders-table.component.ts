import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mangement-orders-table',
  templateUrl: './mangement-orders-table.component.html',
  styleUrls: ['./mangement-orders-table.component.scss'],
})
export class MangementOrdersTableComponent implements OnInit {
  orderDetails: boolean = false;
  orderItems:any;
  orderDataArray: any;
  constructor() { }

  ngOnInit() {
    this.orderItems = [
      { name: 'Santoor', price: 30, count: 1, thumb: 'merchantProduct-1.jpeg',units: 'item'},
      { name: 'Lays', price: 50, count: 5, thumb: 'merchantProduct-2.jpeg',units: 'item' },
      { name: 'Biscuits', price: 50, count: 10, thumb: 'merchantProduct-3.jpeg',units: 'item' },
      { name: 'Ground Nuts', price: 100, count: 1, thumb: 'merchantProduct-4.jpeg',units: 'Kg' },
      { name: 'Oil', price: 150, count: 1, thumb: 'merchantProduct-5.jpeg',units: 'Ltrs' }
    ];
    this.orderDataArray = [
      { assignto: 'xyz', orderId: 25678, date: '11/05/2021 11:12 AM', name: 'Ashok',phone: 9878485868,
      address:'Hyderabad', price:5000,expand:false,status:'pending',storeName:'IKEA',storeAddress:'Hyderabad',
      storeManagerMobile:9787675747 },
      { assignto: 'abc', orderId: 45789, date: '15/05/2021 10:25 AM', name: 'satish',phone: 9878485868,
      address:'Vijayawada', price:2500,expand:false,status:'pending',storeName:'IKEA',storeAddress:'Vijayawada',
      storeManagerMobile:6797874757 },

    ]
  }
  toggle(order) {
    order.expand = !order.expand;
  }
}
