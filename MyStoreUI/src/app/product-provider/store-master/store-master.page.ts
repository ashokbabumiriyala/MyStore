import { Component, OnInit } from '@angular/core';
import{ FormControl, FormGroup, Validators}from '@angular/forms'
import { LoadingController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-store-master',
  templateUrl: './store-master.page.html',
  styleUrls: ['./store-master.page.scss'],
})
export class StoreMasterPage implements OnInit {
editMaster:boolean = false;
istoreMaster:IStoreMaster;
storeMasterFormGroup:FormGroup;
isFormSubmitted:boolean;
  constructor(private loadingController: LoadingController,
    // private StoreMasterService:StoreMasterService,
    private toastController:ToastController) { }

  ngOnInit() {   
    this.createstoreMasterForm();
  }

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
    this.istoreMaster = {
      StoreType: this.StoreType.value, ProviderID: 1, NumberOfStores:Number(this.NumberOfStores.value),
      Name: this.Name.value, MobileNumber: this.MobileNumber.value, Email: this.Email.value,
      TinorGstNumber: this.TinorGstNumber.value, OwnerID:Number(this.OwnerID.value), BankName: this.BankName.value,
      AccountHolderName: this.AccountHolderName.value, AccountNumber: this.AccountHolderName.value, IFSCCode: this.IFSCCode.value,
      BranchName: this.BranchName.value
    };
    // this.StoreMasterService.storeMasterSave('StoreMasterSave', this.istoreMaster)
    // .subscribe((data: any) => {
    //   this.storeMasterFormGroup.reset();
    //   this.presentToast("Store master added successfully.","success")
    // },
    //   (error: any) => {         
                   
    //   });
  }

editMasterInfo() {
	this.editMaster = true;
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
interface IStoreMaster{
  StoreType :string;
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
}


