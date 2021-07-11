import { Component, OnInit } from '@angular/core';
import { DeliveryManagmentService } from '../../delivery-management/delivery-managment.service';
import { ToastController } from '@ionic/angular';
import { HelperService } from 'src/app/common/helper.service';

@Component({
  selector: 'app-excutive-orders-table',
  templateUrl: './excutive-orders-table.component.html',
  styleUrls: ['./excutive-orders-table.component.scss'],
})
export class ExcutiveOrdersTableComponent implements OnInit {
  orderDetails: boolean = false;
  orderItems: any;
  orderDataArray: any;
  executiveOrders = [];
  deliveryStatus = [];
  storeOrderedItems: any = [];
  showOrdersItems: boolean;
  public masterData: any = [];
  public searchOrder: string = '';
  constructor(
    private deliveryManagmentService: DeliveryManagmentService,
    private helperService: HelperService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.executiveOrderList();
  }

  async executiveOrderList() {
    const loadingController = await this.helperService.createLoadingController(
      'loading'
    );
    await loadingController.present();
    const dataObject = {
      ProviderId: Number(sessionStorage.getItem('providerId')),
    };
    await this.deliveryManagmentService
      .executiveOrders('ExecutiveOrderSelect', dataObject)
      .subscribe(
        (data: any) => {
          if (data.executiveOrders.length > 0) {
            this.executiveOrders = data.executiveOrders.sort(
              (a, b) => <any>new Date(b.orderDate) - <any>new Date(a.orderDate)
            );
            this.deliveryStatus = data.deliveryStatus;
            Object.assign(this.masterData, this.executiveOrders);
            this.deliveryStatus.forEach((element, index) => {
              if (element.value == 1) this.deliveryStatus.splice(index, 1);
            });
          } else {
            this.executiveOrders = [];
          }
          loadingController.dismiss();
        },
        (error: any) => {
          loadingController.dismiss();
        }
      );
  }

  async deliveryStatusChange(data: any, order: any) {
    const loadingController = await this.helperService.createLoadingController(
      'loading'
    );
    await loadingController.present();
    const dataObject = {
      OrderStatusId: Number(data.detail.value),
      OrderId: order.orderID,
    };
    await this.deliveryManagmentService
      .deliveryOrderItemsSelect('UpdateDeliveryStatus', dataObject)
      .subscribe(
        (data: any) => {
          this.executiveOrderList();
          loadingController.dismiss();
        },
        (error: any) => {
          loadingController.dismiss();
        }
      );
  }

  toggle(ele): void {
    this.storeOrderedItems = [];
    if (ele.expand) {
      ele.expand = false;
    } else {
      ele.expand = true;
      this.getStoreOrders(ele.orderID);
    }
  }
  async getStoreOrders(orderId: string) {
    this.showOrdersItems = false;
    const loadingController = await this.helperService.createLoadingController(
      'loading'
    );
    await loadingController.present();
    const dataObject = { searchKey: orderId };
    await this.deliveryManagmentService
      .storeOrderItemsSelect('StoreOrderItemsList', dataObject)
      .subscribe(
        (data: any) => {
          this.storeOrderedItems = data.storeOrderList;
          this.showOrdersItems = true;
          loadingController.dismiss();
        },
        (error: any) => {
          loadingController.dismiss();
        }
      );
  }

  filterItems() {
    this.masterData = this.executiveOrders.filter((item) => {
      return (
        item.deliveryStatus
          .toLowerCase()
          .indexOf(this.searchOrder.toLowerCase()) > -1
      );
    });
  }
}
