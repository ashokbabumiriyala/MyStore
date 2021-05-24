import { Component, OnInit } from '@angular/core';
import { HelperService} from 'src/app/common/helper.service'
import {AppConstants} from 'src/app/common/AppConstants';
import { Router, NavigationStart } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  providerName: string;
  roleId: number;
  providerId: number;
  menuItems = [];
  showHead:boolean;
  constructor(private helperService:HelperService,private router: Router,
    private platform: Platform, private fcm: FCM
    ) {
     console.log(this.platform.platforms());
      this.initializeApp();
    }
    initializeApp() {
      this.platform.ready().then(() => {
        if (this.platform.is('android') || this.platform.is('ios')) {
          console.log("running on mobile device!");
          sessionStorage.setItem('mobile', 'true');
        } else {
          sessionStorage.setItem('mobile', 'false');
        }
        if (sessionStorage.getItem('mobile') == 'true') {  
        this.fcm.getToken().then(token => {
          sessionStorage.setItem("PushToken",token);
        });
  

        // ionic push notification example
        this.fcm.onNotification().subscribe(data => {
          console.log(data);
          if (data.wasTapped) {
            console.log('Received in background');
          } else {
            console.log('Received in foreground');
          }
        });

        // refresh the FCM token
        this.fcm.onTokenRefresh().subscribe(token => {
          sessionStorage.setItem("PushToken",token);
        });
      }
      });    
    }
  ngOnInit() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/introduction') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
    this.helperService.getProfileObs().subscribe(profile => {
      if(profile!=null){
      this.menuItems = [];
      this.providerName = profile.name;
      this.roleId = profile.roleId;
      this.providerId = profile.providerId;
      this.loadMenu(profile.menus);
      this.navigatePage(profile.defaultMenuId);
      }
    });
  }
  private loadMenu(menus: any[]): void {
    if (!menus || menus === undefined) {
      return;
    }
    menus.forEach(menu => {
      const menuObject = { title: menu.displayName, id: menu.menuID,icon:menu.icon };
      this.menuItems.push(menuObject);
    });
  }
  public navigatePage(menuId: number): void {
    if (menuId === 0 || menuId == null || menuId === undefined) {
      menuId = (this.menuItems.length > 0) ? this.menuItems[0].id : menuId;
    }
    switch (menuId) {
      case AppConstants.menuNavigation.ProviderDashboard:
        this.router.navigate(['product-provider']);
        break;
      case AppConstants.menuNavigation.StoreMaster:
      this.router.navigate(['product-provider/store-master']);
        break;
      case AppConstants.menuNavigation.StoreSubunits:
        this.router.navigate(['product-provider/single-store']);
        break;
      case AppConstants.menuNavigation.StoreProducts:
        this.router.navigate(['product-provider/store-products']);
        break;
      case AppConstants.menuNavigation.StoreOrders:
        this.router.navigate(['store-orders']);
        break;
      case AppConstants.menuNavigation.StoreDelivery:
        this.router.navigate(['animals']);
        break;
      case AppConstants.menuNavigation.StoreCustomers:
        this.router.navigate(['animals']);
        break;
      case AppConstants.menuNavigation.ServiceDashboard:
        this.router.navigate(['service-provider']);
        break;
      case AppConstants.menuNavigation.BusinessMaster:
        this.router.navigate(['service-provider/service-master']);
        break;
      case AppConstants.menuNavigation.LocationsSubunits:
        this.router.navigate(['service-provider/service-locations']);
        break;
      case AppConstants.menuNavigation.Services:
        this.router.navigate(['service-provider/services']);
        break;

        case AppConstants.menuNavigation.AdminStores:
        this.router.navigate(['admin-product-provider']);
        break;

        case AppConstants.menuNavigation.AdminServices:
        this.router.navigate(['admin-service-provider']);
        break;

        case AppConstants.menuNavigation.ServiceOrders:
          this.router.navigate(['service-orders']);
          break;

          case AppConstants.menuNavigation.Executives:
          this.router.navigate(['delivery-management/add-executive']);
          break;

          case AppConstants.menuNavigation.ManagementOrders:
          this.router.navigate(['delivery-management/management-orders']);
          break;

          case AppConstants.menuNavigation.ExecutivesOrders:
          this.router.navigate(['delivery-management/executive-orders']);
          break;

          case AppConstants.menuNavigation.DeliveryFee:
          this.router.navigate(['delivery-management/delivery-fee']);
          break;

          case AppConstants.menuNavigation.ManagementServicesOrders:
            this.router.navigate(['service-delivery-managment']);
            break;

          
    }
  }
  openMenu() {
    const ele = document.getElementById("panel-split");
    ele.style.zIndex == '1' ? ele.style.zIndex = '3' : ele.style.zIndex = '1' ;
  }
  logout() {
    let pushToken = sessionStorage.getItem('PushToken');
    sessionStorage.clear();
    sessionStorage.setItem('PushToken',pushToken );
    this.menuItems = [];
    this.router.navigate(['login']);
  }
}
