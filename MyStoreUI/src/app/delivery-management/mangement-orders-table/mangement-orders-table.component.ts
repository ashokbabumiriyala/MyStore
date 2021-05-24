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
  showOrdersItems:boolean;
  storeOrderedItems:any = [];
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
  toggle(ele): void { 
     
    this.storeOrderedItems=[]; 
    if (ele.expand) {
      ele.expand = false;
    } else {
      ele.expand = true;
      this.getStoreOrders(ele.orderID);   
    }
  }

  async getStoreOrders(orderId:string)
  {   
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present(); 
    const dataObject={searchKey: orderId};
    await  this.deliveryManagmentService.deliveryOrderItemsSelect('StoreOrderItemsList',dataObject)
          .subscribe((data: any) => {          
           this.storeOrderedItems=data.storeOrderList;
           this.showOrdersItems=true;
           loadingController.dismiss();
          },
            (error: any) => {   
              loadingController.dismiss();
            });
  }

  async executivesChange(data:any,order:any)
  {
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present(); 
    const dataObject={AssignId: Number(sessionStorage.getItem("providerId")),OrderId: order.orderID,ExecutiveId:Number(data.detail.value)};
    await  this.deliveryManagmentService.deliveryOrderItemsSelect('DeliveryOrderAssignInsert',dataObject)
          .subscribe((data: any) => {
            this.deliveryOrdersList();
           loadingController.dismiss();
          },
            (error: any) => {   
              loadingController.dismiss();
            });

  }
  
}
