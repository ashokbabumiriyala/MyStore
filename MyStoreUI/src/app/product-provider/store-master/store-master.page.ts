import { Component, OnInit } from '@angular/core';
import{ FormControl, FormGroup, Validators}from '@angular/forms'
import {HelperService} from '../../common/helper.service';
import {StoreMasterService} from '../store-master/store-master.service';
import { NavController, ToastController } from '@ionic/angular';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-store-master',
  templateUrl: './store-master.page.html',
  styleUrls: ['./store-master.page.scss'],
})
export class StoreMasterPage implements OnInit {
storeMasterList:boolean;
istoreMaster:IStoreMaster;
storeMasterFormGroup:FormGroup;
isFormSubmitted:boolean;
showAddButton:boolean;
provideStoreList= [];
storeType=[];
storeId:number;
title:string;
  constructor(
    private StoreMasterService:StoreMasterService,
    private navCtrl: NavController,
    private router: Router,
    private helperService:HelperService,
    private toastController:ToastController) { }
  ngOnInit() {   
    this.createstoreMasterForm();
    this.storeMasterListSelect();
    this.title="Register";
  }

  //#region list
async storeMasterListSelect(){  
  const loadingController = await this.helperService.createLoadingController("loading");
  await loadingController.present();  
  const dataObject={Id: Number(sessionStorage.getItem("providerId")),Mode:'Select'};
  this.StoreMasterService.storeMasterSelect('ProviderStoreSelect', dataObject)
  .subscribe((data: any) => {
   this.storeType= data.provideStoreType;  
    if(data.provideStoreList.length>0){   
      this.provideStoreList=data.provideStoreList;   
      this.showAddButton=false;
    }else{
      this.showAddButton=true;
      this.provideStoreList=[];   
    }  
  },
    (error: any) => {         
                 
    });
    await loadingController.dismiss();
}
  //#endregion

//#region store master save  [raba(0,205,30,0.1)] 
  get StoreType() {
    return this.storeMasterFormGroup.get('StoreType');
  }
  get NumberOfStores() {
    return this.storeMasterFormGroup.get('NumberOfStores');
  }
  get Name() {
    return this.storeMasterFormGroup.get('Name');
  }
  get MobileNumber() {
    return this.storeMasterFormGroup.get('MobileNumber');
  }
  get Email() {
    return this.storeMasterFormGroup.get('Email');
  }
  get TinorGstNumber() {
    return this.storeMasterFormGroup.get('TinorGstNumber');
  }
  get BankName() {
    return this.storeMasterFormGroup.get('BankName');
  }

  get AccountHolderName() {
    return this.storeMasterFormGroup.get('AccountHolderName');
  }

  get IFSCCode() {
    return this.storeMasterFormGroup.get('IFSCCode');
  }

  get AccountNumber() {
    return this.storeMasterFormGroup.get('AccountNumber');
  }

  get BranchName() {
    return this.storeMasterFormGroup.get('BranchName');
  }

  get OwnerID() {
    return this.storeMasterFormGroup.get('OwnerID');
  } 

  private createstoreMasterForm() { 
    this.storeMasterFormGroup = new FormGroup({
      StoreType: new FormControl('', Validators.required),
      NumberOfStores: new FormControl('', [Validators.required,Validators.maxLength(4)])  ,   
      Name: new FormControl('', Validators.required),
      MobileNumber: new FormControl('', Validators.required)  ,  
      Email: new FormControl('', Validators.required),
      TinorGstNumber: new FormControl('', Validators.required) ,   
      OwnerID: new FormControl('', Validators.required),
      BankName: new FormControl('', Validators.required)  ,  
      AccountHolderName: new FormControl('', Validators.required),
      AccountNumber: new FormControl('', Validators.required) ,   
      IFSCCode: new FormControl('', Validators.required),
      BranchName: new FormControl('', Validators.required)    
    });
  }
  async saveStoreMaster(): Promise<void>{
    this.isFormSubmitted = true;
    if (this.storeMasterFormGroup.invalid) {
      return;
    }   
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present();  
    this.istoreMaster = {
      StoreType:Number(this.StoreType.value), ProviderID:  Number(sessionStorage.getItem("providerId")), NumberOfStores:Number(this.NumberOfStores.value),
      Name: this.Name.value, MobileNumber: this.MobileNumber.value.toString(), Email: this.Email.value,
      TinorGstNumber: this.TinorGstNumber.value.toString(), OwnerID:Number(this.OwnerID.value), BankName: this.BankName.value,
      AccountHolderName: this.AccountHolderName.value, AccountNumber: this.AccountNumber.value.toString(), IFSCCode: this.IFSCCode.value,
      BranchName: this.BranchName.value,Id:this.storeId,Mode:this.title
    };
    this.StoreMasterService.storeMasterSave('StoreMasterSave', this.istoreMaster)
    .subscribe((data: any) => {      
      this.presentToast("Store master " + this.title+ "  successfully.","success");
      this.storeMasterList=false;
      this.storeMasterListSelect();    
    },
      (error: any) => {         
                   
      });
      await loadingController.dismiss();
  } 
//#endregion

// this.caseCategoryData = this.helperService.prepareDropDownData(dropdownData.caseCategoryDetails);
//#region edit store master
editMasterInfo(rowdata:any) {   
  if(rowdata==null){
    this.storeId=0;
    this.title="Register";
  }else{
    const dataObject={Id: Number(rowdata.id),Mode:'Edit'};
    this.storeId=Number(rowdata.id);
    this.StoreMasterService.storeMasterSelect('ProviderStoreSelect', dataObject)
    .subscribe((data: any) => { 
      this.storeType=[];
      this.storeType= data.provideStoreType;
      this.setForamADetailsToPage(data.provideStoreList[0]);
    },
      (error: any) => {  
      });
    this.title="Update";    
  }
	this.storeMasterList = true;
 }
 private setForamADetailsToPage(data: any): void {  
    this.storeMasterFormGroup.patchValue({
    StoreType:String(data.storeTypeId),
    NumberOfStores:Number(data.numberOfStores),
    Name: data.name,
    MobileNumber: data.mobileNumber,
    Email: data.email,
    TinorGstNumber: data.tinorGstNumber,
    OwnerID: data.ownerID,
    BankName: data.bankName,
    AccountHolderName:data.accountHolderName,
    AccountNumber: data.accountNumber,
    IFSCCode: data.ifscCode,
    BranchName: data.branchName    
  });
}
//#endregion

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
interface IStoreMaster{
  StoreType :number;
  ProviderID :number;
  NumberOfStores:number;
  Name :string;
  MobileNumber :string;
  Email :string;
  TinorGstNumber :string;
  OwnerID :number;
  BankName :string;
  AccountHolderName :string;
  AccountNumber :string;
  IFSCCode :string;
  BranchName :string;
  Id:number;
  Mode:string;
}


