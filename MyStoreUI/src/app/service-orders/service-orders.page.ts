import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HelperService} from '../common/helper.service';
import {ServiceOrderService} from '../service-orders/service-order.service';

@Component({
  selector: 'app-service-orders',
  templateUrl: './service-orders.page.html',
  styleUrls: ['./service-orders.page.scss'],
})
export class ServiceOrdersPage implements OnInit {

  serviceOrderedItems:any = [];
  serviceOrders:any=[]; 
  showServiceOrders:boolean;
  public items: any = [];
  public searchOrder: string = "";

  constructor( private router: Router,private helperService:HelperService, private serviceOrderService:ServiceOrderService) { }

  ngOnInit() {
  this.serviceOrderList();
  }
  async serviceOrderList(){
    const loadingController = await this.helperService.createLoadingController("loading");
      await loadingController.present();
      const dataObject={ProviderId: Number(sessionStorage.getItem("providerId")),Mode:'Select'};
      await this.serviceOrderService.serviceOrdersSelect('ServiceOrdersList', dataObject)
      .subscribe((data: any) => {
        this.items=  data.servicesOrders;  
        Object.assign(this.serviceOrders,this.items);         
          loadingController.dismiss();
      },
        (error: any) => {
          loadingController.dismiss();
        });
    
    }

    filterItems() {
      this.serviceOrders = this.items.filter(item => {
        return item.name.toLowerCase().indexOf(this.searchOrder) > -1;
      });
    }

  expandItem(event, ele): void {  
  
    this.serviceOrderedItems=[];
    this.showServiceOrders=false;
    event.currentTarget.classList.toggle('order-status');
    event.currentTarget.classList.toggle('row-icon');
    if (ele.expand) {
      ele.expand = false;
      this.showServiceOrders=false;
    } else {
      ele.expand = true;
      this.getStoreOrders(ele.orderId);   
    }
  }

  async getStoreOrders(orderId:string)
  {   
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present(); 
    const dataObject={searchKey: orderId};
    await  this.serviceOrderService.serviceOrdersItemsSelect('ServiceOrderItemList',dataObject)
          .subscribe((data: any) => {
           this.serviceOrderedItems=data.servicesOrderItems;
           this.showServiceOrders=true;
           loadingController.dismiss();
          },
            (error: any) => {   
              loadingController.dismiss();
            });
  }

  trackStatus() {
    this.router.navigate(['/service-orders']);
  }
}

