import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { NavController, ToastController } from '@ionic/angular';
import {HelperService} from '../../common/helper.service';
import {SingleStoreService} from '../single-store/single-store.service';
 @Component({
  selector: 'app-single-store',
  templateUrl: './single-store.page.html',
  styleUrls: ['./single-store.page.scss'],
})
export class SingleStorePage implements OnInit {
editStore:boolean;
editMaster:boolean;
iSingleStore:ISingleStore;
isFormSubmitted:boolean;
singleStoreFormGroup:FormGroup;
title:string;
masterStore=[];
storeType=[];
provideSubStoreList= [];
storeId:number;
  constructor(private   toastController:ToastController,private helperService:HelperService,
    private singleStoreService:SingleStoreService) { }
 
ngOnInit() {
    this.createSingleStoreForm();
    this.subStoreList();
    this.title="Register";   
  }
//#region   sub store list
async subStoreList(){

const loadingController = await this.helperService.createLoadingController("loading");
  await loadingController.present();  
  const dataObject={ProviderId: Number(sessionStorage.getItem("providerId")),Mode:'Select'};
  this.singleStoreService.subStoreListSelect('ProviderSubStoreSelect', dataObject)
  .subscribe((data: any) => {
   this.masterStore= data.storeMaster;
   this.storeType= data.provideStoreType;
    if(data.provideStoreList.length>0){   
      this.provideSubStoreList=data.provideStoreList;

    }else{
      this.provideSubStoreList=[];   
    }  
  },
    (error: any) => {         
                 
    });
    await loadingController.dismiss();
}
//#endregion

//#region   store save
get ToTime() {
  return this.singleStoreFormGroup.get('ToTime');
}
get FromTime() {
  return this.singleStoreFormGroup.get('FromTime');
}
get LandMark() {
  return this.singleStoreFormGroup.get('LandMark');
}
get PinCode() {
  return this.singleStoreFormGroup.get('PinCode');
}
get State() {
  return this.singleStoreFormGroup.get('State');
}
get City() {
  return this.singleStoreFormGroup.get('City');
}
get Address() {
  return this.singleStoreFormGroup.get('Address');
}
get MobileNmuber() {
  return this.singleStoreFormGroup.get('MobileNmuber');
}
get ManagerID() {
  return this.singleStoreFormGroup.get('ManagerID');
}
get ManagerName() {
  return this.singleStoreFormGroup.get('ManagerName');
}
get Name() {
  return this.singleStoreFormGroup.get('Name');
}
get StoreType(){
  return this.singleStoreFormGroup.get('StoreType');
}
get StoreMasterID(){
  return this.singleStoreFormGroup.get('StoreMasterID');
}
private createSingleStoreForm() { 
  this.singleStoreFormGroup = new FormGroup({
    StoreMasterID: new FormControl('', Validators.required),
    StoreType: new FormControl('', Validators.required)  ,   
    Name: new FormControl('', Validators.required)  ,   
    ManagerName: new FormControl('', Validators.required),
    ManagerID: new FormControl('', Validators.required)  ,  
    MobileNmuber: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required) ,  
    City: new FormControl('', Validators.required) ,    
    State: new FormControl('', Validators.required) ,  
    PinCode: new FormControl('', Validators.required),
    LandMark: new FormControl('', Validators.required)  ,  
    FromTime: new FormControl('', Validators.required),
    ToTime: new FormControl('', Validators.required)     
  });
}
//2021-03-23T10:17:21.362+05:30

async saveStore():Promise<void>{
  this.isFormSubmitted=true;
  if (this.singleStoreFormGroup.invalid) {
    return;
  }  
  else{
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present();  
    this.iSingleStore = {
      StoreMasterID:Number(this.StoreMasterID.value), StoreType:Number(this.StoreType.value), 
      Name: this.Name.value, ManagerName: this.ManagerName.value.toString(), ManagerID: Number(this.ManagerID.value),
      MobileNmuber: this.MobileNmuber.value.toString(), Address:this.Address.value,City:this.City.value,
      State:this.State.value,PinCode:this.PinCode.value.toString(),LandMark:this.LandMark.value,FromTime:this.FromTime.value,
      ToTime:this.ToTime.value,Id:this.storeId,Mode:this.title
    };
 
    this.singleStoreService.singleStoreSave('StoreSave', this.iSingleStore)
    .subscribe((data: any) => {      
      this.presentToast("Store " + this.title+ "  successfully.","success");  
      this.editStore=false;
      this.singleStoreFormGroup.reset();
      this.isFormSubmitted=false
      this.subStoreList();   
    },
      (error: any) => {        
                   
      });
      await loadingController.dismiss();
  }
}
//#endregion
editStoreInfo(rowdata:any){
  this.editStore = true;
  if(rowdata==null){
    this.storeId=0;
    this.title="Register";
  }else{   
    const dataObject={ProviderId: Number(sessionStorage.getItem("providerId")),Id: Number(rowdata.id),Mode:'Edit'};
    this.storeId=Number(rowdata.id);
    this.singleStoreService.subStoreListSelect('ProviderSubStoreSelect', dataObject)
    .subscribe((data: any) => { 
      this.masterStore=[];
      this.storeType=[];
      this.masterStore= data.storeMaster;
      this.storeType= data.provideStoreType;    
      this.setForamADetailsToPage(data.provideStoreList[0]);
    },
      (error: any) => {  
      });
    this.title="Update";    
  }
	// this.storeMasterList = true;
}
private setForamADetailsToPage(data: any): void {
  this.singleStoreFormGroup.patchValue({ 
    StoreMasterID:String(data.storeMasterID),
    StoreType:String(data.storeTypeId),
    Name: data.storeName,
    ManagerName: data.managerName,
    ManagerID: data.managerID,
    MobileNmuber: data.mobileNmuber,
    Address: data.address,
    City: data.city,
    State:data.state,
    PinCode: data.pinCode,
    LandMark: data.landMark,
    FromTime:  data.fromTime   , 
    ToTime: data.toTime  
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


interface ISingleStore{
 StoreMasterID :number;
 StoreType :number;
 Name:string; 
 ManagerName :string; 
 ManagerID :number;
 MobileNmuber :string;
 Address :string;
 City :string;
 State:string;
 PinCode :string;
 LandMark :string;
 FromTime :string;
 ToTime :string;
 Id:number;
 Mode:string;

}