import { Component, AfterViewInit, Input, ViewChild,  ElementRef, Renderer2, OnInit } from "@angular/core";
import { AdminProductProviderService } from '../admin-product-provider.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-row-expand-store-provider',
  templateUrl: './row-expand-store-provider.component.html',
  styleUrls: ['./row-expand-store-provider.component.scss'],
})
export class RowExpandStoreProviderComponent implements OnInit {

  @Input() items: any = [];
  storeData:any = [];
  public searchStore:string= "";
  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expanded") expanded: boolean;
  status:boolean;
  title:string;
  color:string;

// testing


  constructor(public renderer: Renderer2,private   toastController:ToastController,
    private adminProductProviderService:AdminProductProviderService) {
  } 

  ngOnInit() {   
    Object.assign(this.storeData,this.items);
  }

  ngOnChanges(SimpleValues:any) {
   this.expanded = SimpleValues.expanded.currentValue;
  }
  filterItems() {
    this.storeData = this.items.filter(item => {
      return item.name.toLowerCase().indexOf(this.searchStore.toLowerCase()) > -1;
    });
  }

  changeStatus(data:any){
     if(data.status===true){
        this.status=false;
        this.title="Store deactivated  successfully."
        this.color="warning";
      }
    if(data.status===false)  {   
      this.status=true;
      this.title="Store activated successfully."
      this.color="success";
    }
    const dataObject={StoreId: Number(data.id),StoreMasterId: Number(data.storeMasterID),Status:this.status};
    this.adminProductProviderService.updateStore('updateStore',dataObject)
    .subscribe((resultdata: any) => {    
      const dataObject={Id:Number(data.storeMasterID)};
      this.adminProductProviderService.StoresUnderStoreMasterSelect('StoresUnderStoreMaster',dataObject)
      .subscribe((data: any) => {
        this.items=[];
        this.items=data;
       Object.assign(this.storeData,this.items);
       this.presentToast(this.title,this.color);  
      },
        (error: any) => {
        });   
    },
      (error: any) => {         
                   
    });
  }

  async presentToast(data: string,tostarColor:string) {
    const toast = await this.toastController.create({
      message: data,
      duration: 2000,
      position: 'bottom',      
      color: tostarColor
    });
    toast.present();
  }

}
