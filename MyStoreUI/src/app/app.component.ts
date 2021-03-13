import { Component, OnInit } from '@angular/core';
import { HelperService} from 'src/app/common/helper.service'
import {AppConstants} from 'src/app/common/AppConstants';
import { Router } from '@angular/router';  
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
  // public appPages = [
  //   { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
  //   { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
  //   { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
  //   { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
  //   { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //   { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  // ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private helperService:HelperService,private router: Router) {}
  ngOnInit() {
    this.helperService.getProfileObs().subscribe(profile => {     
      if(profile!=null){     
        console.log(profile);
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
      const menuObject = { title: menu.displayName, id: menu.menuID };
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
        this.router.navigate(['animals']);  
        break;
      case AppConstants.menuNavigation.StoreDelivery:
        this.router.navigate(['animals']);  
        break;
      case AppConstants.menuNavigation.StoreCustomers:
        this.router.navigate(['animals']);  
        break;
      case AppConstants.menuNavigation.ServiceDashboard:
        this.router.navigate(['animals']);  
        break;
      case AppConstants.menuNavigation.BusinessMaster:
        this.router.navigate(['service-provider']);  
        break;
      case AppConstants.menuNavigation.LocationsSubunits:
        this.router.navigate(['service-provider/service-locations']); 
        break;
      case AppConstants.menuNavigation.Services:
        this.router.navigate(['service-provider/services']); 
        break;     
    }
  }
}
