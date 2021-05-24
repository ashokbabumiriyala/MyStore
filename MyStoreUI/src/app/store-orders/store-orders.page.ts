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
  public masterData:any = [];
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
        Object.assign(this.masterData,this.items);
          loadingController.dismiss();
      },
        (error: any) => {
          loadingController.dismiss();
        });
    }
 
    filterItems() {
      this.masterData = this.items.filter(item => {   
        debugger;     
        return item.deliveryStatus.toLowerCase().indexOf(this.searchOrder.toLowerCase()) > -1;
      });
    }
  expandItem(event, ele): void {  
    this.storeOrderedItems=[];
    this.showStoreOrders=false;
    event.currentTarget.classList.toggle('order-status');
    event.currentTarget.classList.toggle('row-icon');
    if (ele.expand) {
      ele.expand = false;
      this.showStoreOrders=false;
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
    await  this.storeOrderService.storeOrderItemsSelect('StoreOrderItemsList',dataObject)
          .subscribe((data: any) => {
           this.storeOrderedItems=data.storeOrderList;         
           this.showStoreOrders=true;
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
