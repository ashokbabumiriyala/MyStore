import { Component, OnInit } from '@angular/core';
import { DeliveryManagmentService } from '../delivery-managment.service';
import { HelperService } from '../../common/helper.service';
@Component({
  selector: 'app-mangement-orders-table',
  templateUrl: './mangement-orders-table.component.html',
  styleUrls: ['./mangement-orders-table.component.scss'],
})
export class MangementOrdersTableComponent implements OnInit {
  orderDetails: boolean;
  orderItems: any;
  orderDataArray: any;
  OrderList = [];
  executives = [];
  showOrdersItems: boolean;
  public masterData: any = [];
  public searchOrder: string = '';
  storeOrderedItems: any = [];
  showStoreOrders: boolean;
  selectedIndex: number;
  constructor(
    private deliveryManagmentService: DeliveryManagmentService,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.deliveryOrdersList();
  }
  async deliveryOrdersList() {
    const loadingController = await this.helperService.createLoadingController(
      'loading'
    );
    await loadingController.present();
    await this.deliveryManagmentService
      .deliveryOrdersSelect('DeliveryOrdersSelect')
      .subscribe(
        (data: any) => {
          this.OrderList = data.deliveryOrders.sort(
            (a, b) => <any>new Date(b.orderDate) - <any> new Date(a.orderDate)
          );
          this.executives = data.deliveryexecutives;
          Object.assign(this.masterData, this.OrderList);
          loadingController.dismiss();
        },
        (error: any) => {
          loadingController.dismiss();
        }
      );
  }
  toggle( ele:any, index:number): void {
    this.storeOrderedItems=[];
    this.showStoreOrders=false;
    if (ele.expand) {
      ele.expand = false;
      this.selectedIndex = -1;
    } else {
      this.masterData.forEach(element => {element.expand = false;});
      ele.expand = true;
      this.selectedIndex = index;
      this.getStoreOrders(ele.orderID);   
    }
  }

  async getStoreOrders(orderId: string) {
    const loadingController = await this.helperService.createLoadingController(
      'loading'
    );
    await loadingController.present();
    const dataObject = { searchKey: orderId };
    await this.deliveryManagmentService
      .deliveryOrderItemsSelect('StoreOrderItemsList', dataObject)
      .subscribe(
        (data: any) => {
          this.storeOrderedItems = data.storeOrderList.sort(
            (a, b) => <any>new Date(b.orderDate) - <any> new Date(a.orderDate)
          );
          this.showStoreOrders = true;
          loadingController.dismiss();
        },
        (error: any) => {
          loadingController.dismiss();
        }
      );
  }

  async executivesChange(data: any, order: any) {
    const loadingController = await this.helperService.createLoadingController(
      'loading'
    );
    await loadingController.present();
    const dataObject = {
      AssignId: Number(sessionStorage.getItem('providerId')),
      OrderId: order.orderID,
      ExecutiveId: Number(data.detail.value),
    };
    await this.deliveryManagmentService
      .deliveryOrderItemsSelect('DeliveryOrderAssignInsert', dataObject)
      .subscribe(
        (data: any) => {
          this.deliveryOrdersList();
          loadingController.dismiss();
        },
        (error: any) => {
          loadingController.dismiss();
        }
      );
  }

  filterItems() {
    this.masterData = this.OrderList.filter((item) => {
      return (
        item.deliveryStatus
          .toLowerCase()
          .indexOf(this.searchOrder.toLowerCase()) > -1
      );
    });
  }
}
