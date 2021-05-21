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
  orderedItems:any = [];
  services:any;
  expand:boolean = false;
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
       this.orderedItems= data.servicesOrders;
       console.log(this.orderedItems);
          loadingController.dismiss();
      },
        (error: any) => {
          loadingController.dismiss();
        });
    
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

