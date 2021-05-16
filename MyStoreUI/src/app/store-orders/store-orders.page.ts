import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-orders',
  templateUrl: './store-orders.page.html',
  styleUrls: ['./store-orders.page.scss'],
})
export class StoreOrdersPage implements OnInit {
  storeName:any = "Big Basket";
  orderedDate:any = new Date();
  orderId:any = 12345;
  deliveryStatus:any = 'On the way';
  orderedItems:any = [];
  expand:boolean = false;
  constructor( private router: Router) { }

  ngOnInit() {
    this.orderedItems = [
      { name: 'store 1', date: '10/01/2021', orderId: 25678, status: 'Delivered', expand:false},
      { name: 'store 2', date: '15/05/2021', orderId: 52345, status: 'Pending', expand:false},
      { name: 'store 3', date: '10/05/2021', orderId: 25698, status: 'Delivered', expand:false}
    ];
  }
  expandItem(event, ele): void {  
    event.currentTarget.classList.toggle('order-status');
    event.currentTarget.classList.toggle('row-icon');
    if (ele.expand) {
      ele.expand = false;
    } else {
      ele.expand = true;
    }
  }
  trackStatus() {
    this.router.navigate(['/service-orders']);
  }
}
