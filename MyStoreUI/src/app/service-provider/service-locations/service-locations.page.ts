import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { HelperService } from '../../common/helper.service';
import { ServiceLocationService } from '../../service-provider/service-locations/service-location.service'
@Component({
  selector: 'app-service-locations',
  templateUrl: './service-locations.page.html',
  styleUrls: ['./service-locations.page.scss'],
})
export class ServiceLocationsPage implements OnInit {
editLocation:boolean;
serviceMaster=[];
businessType=[];
deliveryType=[];
providerLocationList=[];
isFormSubmitted:boolean;
title:string;
serviceLocationForm:FormGroup;
iServiceLocations:IServiceLocations;
locationId:number;
  constructor(private   toastController:ToastController,
    private helperService:HelperService,private serviceLocationService:ServiceLocationService) {}  
  ngOnInit() {
    this.createserviceLocationForm();
    this.title="Register";  
    this.serviceLocationListSelect();
    
  }
  get ServiceMasterID() {
    return this.serviceLocationForm.get('ServiceMasterID');
  }
  get BusinessType() {
    return this.serviceLocationForm.get('BusinessType');
  }

  get BusinessName() {
    return this.serviceLocationForm.get('BusinessName');
  }
  get BusinessManagerName() {
    return this.serviceLocationForm.get('BusinessManagerName');
  }
  get ManagerID() {
    return this.serviceLocationForm.get('ManagerID');
  }
  get MobileNmuber() {
    return this.serviceLocationForm.get('MobileNmuber');
  }
  get Address() {
    return this.serviceLocationForm.get('Address');
  }
  get State() {
    return this.serviceLocationForm.get('State');
  }
  get City() {
    return this.serviceLocationForm.get('City');
  }
  
  get LandMark() {
    return this.serviceLocationForm.get('LandMark');
  }

  get PinCode() {
    return this.serviceLocationForm.get('PinCode');
  }

  get FromTime() {
    return this.serviceLocationForm.get('FromTime');
  }
  get ToTime() {
    return this.serviceLocationForm.get('ToTime');
  }  
  get DeliveryType() {
    return this.serviceLocationForm.get('DeliveryType');
  }
  private createserviceLocationForm(){
    this.serviceLocationForm = new FormGroup({
      ServiceMasterID: new FormControl('', Validators.required),
      BusinessType: new FormControl('', Validators.required)  ,   
      BusinessName: new FormControl('', Validators.required)  ,   
      BusinessManagerName: new FormControl('', Validators.required),
      ManagerID: new FormControl('', Validators.required)  ,  
      MobileNmuber: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required) ,  
      City: new FormControl('', Validators.required) ,    
      State: new FormControl('', Validators.required) ,  
      PinCode: new FormControl('', Validators.required),
      LandMark: new FormControl('', Validators.required)  ,  
      FromTime: new FormControl('', Validators.required),
      ToTime: new FormControl('', Validators.required),
      DeliveryType: new FormControl('', Validators.required)          

    });
  }


//#region   list
async serviceLocationListSelect(){  
  const loadingController = await this.helperService.createLoadingController("loading");
  await loadingController.present();  
  const dataObject={Id: Number(sessionStorage.getItem("providerId")),Mode:'Select'};
  this.serviceLocationService.locationListSelect('serviceLocationSelect', dataObject)
  .subscribe((data: any) => {  
    this.serviceMaster=data.serviceMaster;
    this.deliveryType=data.deliveryType;
    this.businessType=data.serviceType;
    this.providerLocationList=data.locationList;
  },
    (error: any) => {         
                 
    });
    await loadingController.dismiss();
}
//#endregion
  async saveLocation():Promise<void>{
    this.isFormSubmitted=true;
    if (this.serviceLocationForm.invalid) {
      return;
    }  else{
      const loadingController = await this.helperService.createLoadingController("loading");
      await loadingController.present();  
      this.iServiceLocations = {
        ServiceMasterID:Number(this.ServiceMasterID.value), BusinessType:Number(this.BusinessType.value), 
        BusinessName: this.BusinessName.value, BusinessManagerName: this.BusinessManagerName.value.toString(), ManagerID: Number(this.ManagerID.value),
        MobileNmuber: this.MobileNmuber.value.toString(), Address:this.Address.value,City:this.City.value,
        State:this.State.value,PinCode:this.PinCode.value.toString(),LandMark:this.LandMark.value,FromTime:this.FromTime.value,
        ToTime:this.ToTime.value,DeliveryType:Number(this.DeliveryType.value), Id:this.locationId,Mode:this.title };
   
      this.serviceLocationService.locationSave('ServiceLocationSave', this.iServiceLocations)
      .subscribe((data: any) => {      
        this.presentToast("Service Location " + this.title+ "  successfully.","success");  
      
        this.serviceLocationForm.reset();
        this.editLocation=false;
         this.serviceLocationListSelect();   
      },
        (error: any) => {        
                     
        });
        await loadingController.dismiss();
    }
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
editServiceInfo(rowdata:any) {
  this.editLocation = true;
  if(rowdata==null){
    this.locationId=0;
    this.title="Register";
  }else{
    this.locationId=rowdata.id;
    this.title="Update";
    const dataObject={Id: Number(rowdata.id),Mode:'Edit'};
    this.serviceLocationService.locationListSelect('serviceLocationSelect', dataObject)
    .subscribe((data: any) => {
      this.serviceMaster=[];
      this.deliveryType=[];
      this.businessType=[];      
      this.serviceMaster=data.serviceMaster;
      this.deliveryType=data.deliveryType;
      this.businessType=data.serviceType;
       this.setForamADetailsToPage(data.locationList[0]);     
    },
      (error: any) => {         
                   
      });
    

  }
}
private setForamADetailsToPage(data: any): void {  
  console.log(data);
  this.serviceLocationForm.patchValue({
  ServiceMasterID: String(data.serviceMasterID),
  BusinessType: String(data.storeTypeId),   
  BusinessName: data.businessName,
  BusinessManagerName:  data.businessManagerName,
  ManagerID:Number(data.managerID),
  MobileNmuber:data.mobileNmuber,
  Address: data.address,
  City: data.city, 
  State:data.state,
  PinCode: data.pinCode,
  LandMark: data.landMark,
  FromTime: data.fromTime,
  ToTime:data.toTime,
  DeliveryType:  String(data.deliveryTypeId)
});
}
}



interface IServiceLocations{
  ServiceMasterID :number;
  BusinessType :number;
  BusinessName:string; 
  BusinessManagerName :string; 
  ManagerID :number;
  MobileNmuber :string;
  Address :string;
  City :string;
  State:string;
  PinCode :string;
  LandMark :string;
  FromTime :string;
  ToTime :string;
  DeliveryType:Number;
  Id:number;
  Mode:string; 
 }