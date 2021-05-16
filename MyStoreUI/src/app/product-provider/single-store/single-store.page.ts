import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { NavController, ToastController } from '@ionic/angular';
import {HelperService} from '../../common/helper.service';
import {SingleStoreService} from '../single-store/single-store.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import {File, FileEntry} from '@ionic-native/file/ngx';
import { Alert } from 'ionic-angular';

 @Component({
  selector: 'app-single-store',
  templateUrl: './single-store.page.html',
  styleUrls: ['./single-store.page.scss'],
})
export class SingleStorePage implements OnInit {
editStore:boolean;
// iSingleStore:ISingleStore;
isFormSubmitted:boolean;
singleStoreFormGroup:FormGroup;
title:string;
masterStore=[];
storeType=[];
provideSubStoreList= [];
storeId:number;
mobileApp:boolean;
selectedDocs=[];
tempStore=[];
@ViewChild('selectedWebDocs') selectedWebDocs;
  constructor(private   toastController:ToastController,private helperService:HelperService,
    private singleStoreService:SingleStoreService,
    private actionSheetController:ActionSheetController,
    private camera: Camera,private alertController:AlertController
    ) { }

ngOnInit() {
  debugger;
  if (sessionStorage.getItem('mobile') == 'true') {
    this.mobileApp = true;
  } else {
    this.mobileApp = false;
  }
    this.createSingleStoreForm();
    this.subStoreList();
    this.title="Register";
  }
//#region   sub store list
async subStoreList(){
const loadingController = await this.helperService.createLoadingController("loading");
  await loadingController.present();
  const dataObject={ProviderId: Number(sessionStorage.getItem("providerId")),Mode:'Select'};
  await this.singleStoreService.subStoreListSelect('ProviderSubStoreSelect', dataObject)
  .subscribe((data: any) => {
   this.masterStore= data.storeMaster;
   this.storeType= data.provideStoreType;
    if(data.provideStoreList.length>0){
      this.provideSubStoreList=data.provideStoreList;
      loadingController.dismiss();
    }else{
      this.provideSubStoreList=[];
      loadingController.dismiss();
    }
  },
    (error: any) => {
      loadingController.dismiss();
    });

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
    const storeObject = {
      StoreMasterID:Number(this.StoreMasterID.value), StoreType:Number(this.StoreType.value),
      Name: this.Name.value, ManagerName: this.ManagerName.value.toString(), ManagerID: Number(this.ManagerID.value),
      MobileNmuber: this.MobileNmuber.value.toString(), Address:this.Address.value,City:this.City.value,
      State:this.State.value,PinCode:this.PinCode.value.toString(),LandMark:this.LandMark.value,FromTime:this.FromTime.value,
      ToTime:this.ToTime.value,Id:this.storeId,Mode:this.title, Files: this.selectedDocs
    };
    this.tempStore.push(storeObject);
    this.selectedDocs = [];
    this.selectedWebDocs.nativeElement.value = "";
    let formDataList = this.getFormData(this.tempStore);
    this.singleStoreFormGroup.reset();
    await this.singleStoreService.singleStoreSave('StoreSave',formDataList[0])
    .subscribe((data: any) => {
      this.presentToast("Store " + this.title+ "  successfully.","success");
      this.editStore=false;
      this.tempStore=[];
      this.isFormSubmitted=false
      this.subStoreList();
      loadingController.dismiss();
    },
      (error: any) => {
        loadingController.dismiss();
      });
  }
}

getFormData(tempProducts:any[]){
  let formData = [];
  for(let i = 0; i < tempProducts.length; i++){
    let productFormData = new FormData();
    for (var key of Object.keys(tempProducts[i])) {
      if (typeof(tempProducts[i][key]) == 'string'){
        productFormData.append(key, tempProducts[i][key]);
      } else if (typeof(tempProducts[i][key]) == 'number'){
        productFormData.append(key, tempProducts[i][key] + "");
      } else {
        for (var j = 0; j < tempProducts[i][key].length; j++) {
          productFormData.append("files", tempProducts[i][key][j], 'StoreLogoImage' + j + '.jpg');
        }
      }
    }
    formData.push(productFormData);
  }
  return formData;
}

//#endregion
async editStoreInfo(rowdata:any){
  this.editStore = true;
  if(rowdata==null){
    this.storeId=0;
    this.singleStoreFormGroup.reset();  
    this.title="Register";
  }else{
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present();
    const dataObject={ProviderId: Number(sessionStorage.getItem("providerId")),Id: Number(rowdata.id),Mode:'Edit'};
    this.storeId=Number(rowdata.id);
    await this.singleStoreService.subStoreListSelect('ProviderSubStoreSelect', dataObject)
    .subscribe((data: any) => {
      this.masterStore=[];
      this.storeType=[];
      this.masterStore= data.storeMaster;
      this.storeType= data.provideStoreType;
      this.setForamADetailsToPage(data.provideStoreList[0]);
      loadingController.dismiss();
    },
      (error: any) => {
        loadingController.dismiss();
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
ionViewDidLeave() {
  this.editStore = false;
  this.singleStoreFormGroup.reset();
}
async presentAlertConfirm(rowData:any) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Do you want to delete',
    message: rowData.storeMasterName + ' ?',
    buttons: [
      {
        text: 'Confirm',
        handler: () => {
          console.log(rowData);
          this.deleteStore(rowData.id);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }
    ]
  });
  await alert.present();
}
async deleteStore(storeId:number){
  const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present();
    const dataObject={StoreId: storeId};  
    await this.singleStoreService.deleteStore('storeDelete', dataObject)
    .subscribe((data: any) => {     
      this.subStoreList();
      loadingController.dismiss();
    },
      (error: any) => {
        loadingController.dismiss();
      });
}
async selectImage() {
  const actionSheet = await this.actionSheetController.create({
    header: "Select Image source",
    buttons: [{
      text: 'Load from Library',
      handler: () => {
        this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
      }
    },
    {
      text: 'Use Camera',
      handler: () => {
        this.pickImage(this.camera.PictureSourceType.CAMERA);
      }
    },
    {
      text: 'Cancel',
      role: 'cancel'
    }
    ]
  });
  await actionSheet.present();
}

pickImage(sourceType) {
  const options: CameraOptions = {
    quality: 100,
    sourceType: sourceType,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  }

}
selectedImgWeb(data){
  console.log(data);
  var files = data.target.files;
  for(let i = 0 ; i <files.length; i++) {
    if (files[i]) {
      var reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(files[i]);
    }
  }
}
async _handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
  let base64textString= btoa(binaryString);
  await this.getblobObject('data:image/jpeg;base64,' + base64textString)
 }

 async getblobObject(base64Data){
  const base64 = await fetch(base64Data);
  const blob = await base64.blob();
  this.selectedDocs.push(blob);
}
}
// interface ISingleStore{
//  StoreMasterID :number;
//  StoreType :number;
//  Name:string;
//  ManagerName :string;
//  ManagerID :number;
//  MobileNmuber :string;
//  Address :string;
//  City :string;
//  State:string;
//  PinCode :string;
//  LandMark :string;
//  FromTime :string;
//  ToTime :string;
//  Id:number;
//  Mode:string;

// }
