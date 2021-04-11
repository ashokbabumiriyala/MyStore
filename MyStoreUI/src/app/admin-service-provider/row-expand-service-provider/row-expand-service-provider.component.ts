import { Component, AfterViewInit, Input, ViewChild,  ElementRef, Renderer2 } from "@angular/core";
import {AdminServiceProviderService} from '../admin-service-provider.service'
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-row-expand-service-provider',
  templateUrl: './row-expand-service-provider.component.html',
  styleUrls: ['./row-expand-service-provider.component.scss'],
})
export class RowExpandServiceProviderComponent implements AfterViewInit {

  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expandHeight") expandHeight: string = "250px";
  @Input() locations: any = [];
  serviceData:any = [];
  public searchService:string= "";
  @Input("expanded") expanded: boolean;
  status:boolean;
  title:string;
  color:string;

  constructor(public renderer: Renderer2, private adminServiceProviderService:AdminServiceProviderService,
    private   toastController:ToastController,) {
    // this.items = [
    //   {name:'Store-1', status:true},
    //   {name:'Store-2', status:false},
    //   {name:'Store-3', status:true},
    //   {name:'Store-4', status:true},
    //   {name:'Store-5', status:false}
    // ];
    Object.assign(this.serviceData,this.locations);
    debugger;
    console.log(this.serviceData);
  }
  filterItems() {
    this.serviceData = this.locations.filter(item => {
      return item.store.toLowerCase().indexOf(this.searchService.toLowerCase()) > -1;
    });
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, "height", this.expandHeight);
  }
  ngOnChanges(SimpleValues:any) {
   this.expanded = SimpleValues.expanded.currentValue;
  }


  changeStatus(data:any){
   
    if(data.status===true){
       this.status=false;
       this.title="Location deactivated  successfully."
       this.color="warning";
     }
   if(data.status===false)  {   
     this.status=true;
     this.title="Location activated successfully."
     this.color="success";
   }
   const dataObject={ServiceId: Number(data.id),ServiceMasterId: Number(data.serviceMasterID),Status:this.status};
   this.adminServiceProviderService.updateLocation('updateServiceLocation',dataObject)
   .subscribe((resultdata: any) => {    
     const dataObject={Id:Number(data.serviceMasterID)};
     this.adminServiceProviderService.LocationUnderServiceMasterSelect('ServicesUnderServiceMaster',dataObject)
     .subscribe((data: any) => {
       this.locations=[];
       this.locations=data;
      Object.assign(this.serviceData,this.locations);
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
