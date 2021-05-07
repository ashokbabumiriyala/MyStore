import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {HelperService} from '../../common/helper.service';
import {ServiceMasterService} from '../../service-provider/service-master/service-master.service'
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-service-master',
  templateUrl: './service-master.page.html',
  styleUrls: ['./service-master.page.scss'],
})
export class ServiceMasterPage implements OnInit {
serviceMasterFormGroup:FormGroup;
providerServiceMasterList=[];
serviceId:number;
title:string;
iServiceMaster:IServiceMaster;
serviceMasterList:boolean;
isFormSubmitted:Boolean;
showAddButton:boolean;
serviceType=[];
constructor(private helperService:HelperService,
  private serviceMasterService:ServiceMasterService,
  private toastController:ToastController) { }
  ngOnInit() {
    this.createServiceMasterForm();
    this.serviceMasterListSelect();
    this.title="Register";
  }  
  //#region list
async serviceMasterListSelect(){  
  const loadingController = await this.helperService.createLoadingController("loading");
  await loadingController.present();  
  const dataObject={Id: Number(sessionStorage.getItem("providerId")),Mode:'Select'};
  await this.serviceMasterService.serviceMasterSelect('serviceProviderMasterListSelect', dataObject)
  .subscribe((data: any) => {
   this.serviceType= data.provideServiceType;  
    if(data.provideServiceList.length>0){   
      this.providerServiceMasterList=data.provideServiceList;   
      this.showAddButton=false;
      loadingController.dismiss();
    }else{
      this.showAddButton=true;
      this.providerServiceMasterList=[];  
      loadingController.dismiss(); 
    }  
  },
    (error: any) => {  
      loadingController.dismiss();       
                 
    });
    
}
//#region   service save
  get BusinessType() {
    return this.serviceMasterFormGroup.get('BusinessType');
  }
  get NumberOfLocations() {
    return this.serviceMasterFormGroup.get('NumberOfLocations');
  }
  get BusinessName() {
    return this.serviceMasterFormGroup.get('BusinessName');
  }
  get MobileNumber() {
    return this.serviceMasterFormGroup.get('MobileNumber');
  }
  get Email() {
    return this.serviceMasterFormGroup.get('Email');
  }
  get TinorGstNumber() {
    return this.serviceMasterFormGroup.get('TinorGstNumber');
  }
  get BankName() {
    return this.serviceMasterFormGroup.get('BankName');
  }
  get AccountHolderName() {
    return this.serviceMasterFormGroup.get('AccountHolderName');
  }
  get IFSCCode() {
    return this.serviceMasterFormGroup.get('IFSCCode');
  }
  get AccountNumber() {
    return this.serviceMasterFormGroup.get('AccountNumber');
  }
  get BranchName() {
    return this.serviceMasterFormGroup.get('BranchName');
  }
  get OwnerID() {
    return this.serviceMasterFormGroup.get('OwnerID');
  }

  get RazorPaymentKey(){
    return this.serviceMasterFormGroup.get('RazorPaymentKey');
  }
  private createServiceMasterForm() { 
    this.serviceMasterFormGroup = new FormGroup({
      BusinessType: new FormControl('', Validators.required),
      NumberOfLocations: new FormControl('', Validators.required)  ,   
      BusinessName: new FormControl('', Validators.required),
      MobileNumber: new FormControl('', Validators.required)  ,  
      Email: new FormControl('', Validators.required),
      TinorGstNumber: new FormControl('', Validators.required) ,   
      OwnerID: new FormControl('', Validators.required),
      BankName: new FormControl('', Validators.required)  ,  
      AccountHolderName: new FormControl('', Validators.required),
      AccountNumber: new FormControl('', Validators.required) ,   
      IFSCCode: new FormControl('', Validators.required),
      BranchName: new FormControl('', Validators.required) ,  
      RazorPaymentKey : new FormControl('')   
    });
  }
  async saveServiceMaster(): Promise<void>{
    this.isFormSubmitted = true;
    if (this.serviceMasterFormGroup.invalid) {
      return;
    }   
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present();  
    this.iServiceMaster = {
      BusinessType:Number(this.BusinessType.value), ProviderID:  Number(sessionStorage.getItem("providerId")), NumberOfLocations:Number(this.NumberOfLocations.value),
      BusinessName: this.BusinessName.value, MobileNumber: this.MobileNumber.value.toString(), Email: this.Email.value,
      TinorGstNumber:String(this.TinorGstNumber.value), OwnerID:Number(this.OwnerID.value), BankName: this.BankName.value,
      AccountHolderName: this.AccountHolderName.value, AccountNumber: String(this.AccountNumber.value), IFSCCode: this.IFSCCode.value,
      BranchName: this.BranchName.value, RazorPaymentKey:this.RazorPaymentKey.value, Id:this.serviceId,Mode:this.title
    };  
    await this.serviceMasterService.serviceMasterSave('ServiceMasterSave', this.iServiceMaster)
    .subscribe((data: any) => {      
      this.presentToast("Service master information added successfully!","success");
      this.serviceMasterList=false;
      this.serviceMasterListSelect();  
      loadingController.dismiss();  
    },
      (error: any) => {         
        loadingController.dismiss();   
      });
      
  } 

  //#endregion
  async editMasterInfo(rowdata:any) {
  this.serviceMasterList = true;
  if(rowdata==null){
    this.serviceId=0;
    this.title="Register";
  }else{
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present();  
    this.serviceId=rowdata.id;
    this.title="Update";
    const dataObject={Id: Number(rowdata.id),Mode:'Edit'};
    await this.serviceMasterService.serviceMasterSelect('serviceProviderMasterListSelect', dataObject)
    .subscribe((data: any) => {
     this.serviceType= data.provideServiceType;  
      if(data.provideServiceList.length>0){   
       this.setForamADetailsToPage(data.provideServiceList[0]); 
       loadingController.dismiss();  
      }
    },
      (error: any) => {         
        loadingController.dismiss();       
      });
    

  }
}

private setForamADetailsToPage(data: any): void {  
  this.serviceMasterFormGroup.patchValue({
  BusinessType:String(data.businessTypeId),
  NumberOfLocations:Number(data.numberOfLocations),
  BusinessName: data.businessName,
  MobileNumber: data.mobileNumber,
  Email: data.email,
  TinorGstNumber: data.tinorGstNumber,
  OwnerID: data.ownerID,
  BankName: data.bankName,
  AccountHolderName:data.accountHolderName,
  AccountNumber: data.accountNumber,
  IFSCCode: data.ifscCode,
  BranchName: data.branchName    ,
  RazorPaymentKey:data.razorPaymentKey
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

interface IServiceMaster{
  BusinessType :number;
  ProviderID :number;
  NumberOfLocations:number;
  BusinessName :string;
  MobileNumber :string;
  Email :string;
  TinorGstNumber :string;
  OwnerID :number;
  BankName :string;
  AccountHolderName :string;
  AccountNumber :string;
  IFSCCode :string;
  BranchName :string;
  RazorPaymentKey:string;
  Id:number;
  Mode:string;
}
