import { Component, OnInit } from '@angular/core';
import {HelperService} from '../common/helper.service';
import {ServiceOrderService} from '../service-orders/service-order.service';
@Component({
  selector: 'app-service-delivery-managment',
  templateUrl: './service-delivery-managment.page.html',
  styleUrls: ['./service-delivery-managment.page.scss'],
})
export class ServiceDeliveryManagmentPage implements OnInit {
  serviceOrderedItems:any = [];
  serviceOrders:any=[]; 
  showServiceOrders:boolean;
  public items: any = [];
  public searchService: string = "";
  public masterData:any = [];
  selectedIndex: number;
  constructor(private helperService:HelperService, private serviceOrderService:ServiceOrderService) { }

  ngOnInit() {
    this.serviceOrderList();
  }

  async serviceOrderList(){
    const loadingController = await this.helperService.createLoadingController("loading");
      await loadingController.present();
      const dataObject={ProviderId: Number(0),Mode:'Select'};
      await this.serviceOrderService.serviceOrdersSelect('ServiceOrdersList', dataObject)
      .subscribe((data: any) => {
        console.log(data);
        this.items = data.servicesOrders.sort(
          (a, b) => <any>new Date(b.orderDate) - <any> new Date(a.orderDate)
        );
        Object.assign(this.masterData,this.items);         
          loadingController.dismiss();
      },
        (error: any) => {
          loadingController.dismiss();
        });
    
    }

    filterItems() {
      this.masterData = this.items.filter(item => {
        return item.orderStatus.toLowerCase().indexOf(this.searchService.toLowerCase()) > -1;
      });
    }
    expandItem( event:any,ele:any, index:number): void {
      this.serviceOrderedItems=[];
      this.showServiceOrders=false;
      if (ele.expand) {
        ele.expand = false;
        this.selectedIndex = -1;
      } else {
        this.masterData.forEach(element => {element.expand = false;});
        ele.expand = true;
        this.selectedIndex = index;
        this.getServiceOrderItems(ele.orderId);   
      }
    }
  
    async getServiceOrderItems(orderId:string)
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

}
