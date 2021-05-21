import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HelperService} from '../common/helper.service';
import {StoreOrderService} from '../store-orders/store-order.service';
@Component({
  selector: 'app-store-orders',
  templateUrl: './store-orders.page.html',
  styleUrls: ['./store-orders.page.scss'],
})
export class StoreOrdersPage implements OnInit { 
  storeOrderedItems:any = [];
  storeOrders:any=[]; 
  showStoreOrders:boolean;
  public items: any = [];
  public searchOrder: string = "";
  constructor( private router: Router,private helperService:HelperService, 
    private storeOrderService:StoreOrderService) { }

  ngOnInit() {
  this.storeOrderListData();
  }
  async storeOrderListData(){
    const loadingController = await this.helperService.createLoadingController("loading");
      await loadingController.present();
      const dataObject={ProviderId: Number(sessionStorage.getItem("providerId")),Mode:'Select'};
      await this.storeOrderService.storeOrderSelect('StoreOrdersList', dataObject)
      .subscribe((data: any) => {
        this.items=  data.storeOrderList;  
        Object.assign(this.storeOrders,this.items);
          loadingController.dismiss();
      },
        (error: any) => {
          loadingController.dismiss();
        });
    }

    filterItems() {
      this.storeOrderedItems = this.items.filter(item => {
        return item.name.toLowerCase().indexOf(this.searchOrder.toLowerCase()) > -1;
      });
    }

  expandItem(item): void { 
    this.storeOrderedItems=[];
    this.showStoreOrders=false;  
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
          this.getStoreOrders(item.orderId);          
        } else {
          listItem.expanded = false;        }
        return listItem;
      });     
    }
  }

  async getStoreOrders(orderId:string)
  {
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present(); 
    const dataObject={searchKey: orderId};
    await  this.storeOrderService.storeOrderItemsSelect('StoreOrderItemsList',dataObject)
          .subscribe((data: any) => {
             
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
