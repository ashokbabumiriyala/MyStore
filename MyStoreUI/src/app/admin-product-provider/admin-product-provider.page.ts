import { Component, OnInit } from '@angular/core';
import {AdminProductProviderService} from '../admin-product-provider/admin-product-provider.service';
import {HelperService} from '../common/helper.service';
@Component({
  selector: 'app-admin-product-provider',
  templateUrl: './admin-product-provider.page.html',
  styleUrls: ['./admin-product-provider.page.scss'],
})
export class AdminProductProviderPage implements OnInit {
  public items: any = [];
  public masterData:any = [];
  public searchMaster: string = "";
  stores : any = [];
  showStores:boolean;
  constructor(private adminProductProviderService:AdminProductProviderService,
    private helperService:HelperService) {   
  }
  ngOnInit() {    
    this.adminStoreMasterList();
  }
async adminStoreMasterList(){
  const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present(); 
    await this.adminProductProviderService.adminStoreMasterSelect('AdminStoreMasters')
    .subscribe((data: any) => {
     this.items= data;
     Object.assign(this.masterData,this.items);
     loadingController.dismiss();
    },
      (error: any) => {    
        loadingController.dismiss();
      });
       
  }
  filterItems() {
    this.masterData = this.items.filter(item => {
      return item.name.toLowerCase().indexOf(this.searchMaster.toLowerCase()) > -1;
    });
  }
  expandItem(item): void { 
    this.stores=[];
    this.showStores=false;  
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
          this.getStoresByStoreMaster(Number(item.id));          
        } else {
          listItem.expanded = false;        }
        return listItem;
      });     
    }
  }

  async getStoresByStoreMaster(storeId:number)
  {
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present(); 
    const dataObject={Id: storeId};
    await  this.adminProductProviderService.StoresUnderStoreMasterSelect('StoresUnderStoreMaster',dataObject)
          .subscribe((data: any) => {
           this.stores=data;
           this.showStores=true;  
           loadingController.dismiss();
          },
            (error: any) => {   
              loadingController.dismiss();
            });
  }
}