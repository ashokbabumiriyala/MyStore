import { Component, OnInit } from '@angular/core';
import{FormControl, FormGroup, Validators}from '@angular/forms'

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
  constructor() { }

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
      NumberOfStores: new FormControl('', Validators.required)  ,   
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
  }

editMasterInfo() {
	this.editMaster = true;
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


