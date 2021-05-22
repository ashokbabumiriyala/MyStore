import { Component, OnInit } from '@angular/core';
import {DeliveryManagmentService}  from '../delivery-managment.service'
import {HelperService}  from '../../common/helper.service';
@Component({
  selector: 'app-mangement-orders-table',
  templateUrl: './mangement-orders-table.component.html',
  styleUrls: ['./mangement-orders-table.component.scss'],
})
export class MangementOrdersTableComponent implements OnInit {
  orderDetails: boolean;
  orderItems:any;
  orderDataArray: any;
  OrderList= [];
  executives= [];
  constructor(private deliveryManagmentService:DeliveryManagmentService,
    private helperService:HelperService) { }

  ngOnInit() {
    this.deliveryOrdersList();

  }
  async deliveryOrdersList(){
    const loadingController = await this.helperService.createLoadingController("loading");
  await loadingController.present();
  await this.deliveryManagmentService.deliveryOrdersSelect('DeliveryOrdersSelect')
  .subscribe((data: any) => {
   this.OrderList= data.deliveryOrders;
   this.executives=data.deliveryexecutives;
   loadingController.dismiss();
  },
    (error: any) => {
      loadingController.dismiss();
    });
  }
  toggle(order) {
    console.log(order);
    this.getStoreOrders(order.orderID);
    //StoreOrderItemsList
    order.expand = !order.expand;
  }

  async getStoreOrders(orderId:string)
  {   
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present(); 
    const dataObject={searchKey: orderId};
    await  this.deliveryManagmentService.deliveryOrderItemsSelect('StoreOrderItemsList',dataObject)
          .subscribe((data: any) => {
            console.log(data);
           this.orderItems=data.storeOrderList;
           loadingController.dismiss();
          },
            (error: any) => {   
              loadingController.dismiss();
            });
  }
}
