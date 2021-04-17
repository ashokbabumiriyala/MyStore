import { Component, OnInit } from '@angular/core';
import {HelperService} from '../common/helper.service';
import {AdminServiceProviderService}  from '../admin-service-provider/admin-service-provider.service';
@Component({
  selector: 'app-admin-service-provider',
  templateUrl: './admin-service-provider.page.html',
  styleUrls: ['./admin-service-provider.page.scss'],
})
export class AdminServiceProviderPage implements OnInit {
  public items: any = [];
  public serviceData:any = [];
  public searchService: string = "";
  locations : any = [];
  showServices:boolean;

  constructor(private helperService:HelperService, 
    private  adminServiceProviderService:AdminServiceProviderService) {
    // this.items = [
    //   {master:'Master-1', expanded: true },
    //   {master:'Master-2', expanded: false },
    //   {master:'Master-3', expanded: false },
    //   {master:'Master-4', expanded: false },
    //   {master:'Master-5', expanded: false }
    // ];
    Object.assign(this.serviceData,this.items);
  }
  ngOnInit() {
    this.adminServiceMasterList();
  }
  async adminServiceMasterList(){
    this.locations=[];
    const loadingController = await this.helperService.createLoadingController("loading");
      await loadingController.present(); 
      this.adminServiceProviderService.adminServiceMasterSelect('AdminServiceMasters')
      .subscribe((data: any) => {
       this.items= data;      
       Object.assign(this.serviceData,this.items);
      },
        (error: any) => {    
        });
        await loadingController.dismiss();
    }
  filterItems() {
    this.serviceData = this.items.filter(item => {
      return item.master.toLowerCase().indexOf(this.searchService.toLowerCase()) > -1;
    });
  }
  expandItem(item): void {
    this.locations=[];
    this.showServices=false;  
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
          this.getLocationsByServiceMaster(Number(item.id)); 
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  public getLocationsByServiceMaster(serviceId:number)
  {   
    const dataObject={Id: serviceId};
          this.adminServiceProviderService.LocationUnderServiceMasterSelect('ServicesUnderServiceMaster',dataObject)
          .subscribe((data: any) => {           
           this.locations=data;
           this.showServices=true;  
          },
            (error: any) => {         
                         
            });
  }
}