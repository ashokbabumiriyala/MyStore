import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
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
  constructor(private loadingController: LoadingController) { }
  fromDate = "2021-03-10T09:30";
  toDate = "2021-03-10T21:30";
  ngOnInit() {
    this.createSingleStoreForm();
  }
editStoreInfo(){
	this.editStore = true;
}

get LandMark() {
  return this.singleStoreFormGroup.get('LandMark');
}
get PinCode() {
  return this.singleStoreFormGroup.get('PinCode');
}
get MobileNmuber() {
  return this.singleStoreFormGroup.get('MobileNmuber');
}
get Address() {
  return this.singleStoreFormGroup.get('Address');
}
get ManagerID() {
  return this.singleStoreFormGroup.get('ManagerID');
}
get StoreType() {
  return this.singleStoreFormGroup.get('StoreType');
}
get ManagerName() {
  return this.singleStoreFormGroup.get('ManagerName');
}
get StoreMasterID() {
  return this.singleStoreFormGroup.get('StoreMasterID');
}
get FromTime() {
  return this.singleStoreFormGroup.get('FromTime');
}
get ToTime() {
  return this.singleStoreFormGroup.get('ToTime');
}

get StoreName() {
  return this.singleStoreFormGroup.get('StoreName');
}

get City(){
  return this.singleStoreFormGroup.get('City');
}
get State(){
  return this.singleStoreFormGroup.get('State');
}

private createSingleStoreForm() { 
  this.singleStoreFormGroup = new FormGroup({
    StoreMasterID: new FormControl('', Validators.required),
    StoreType: new FormControl('', Validators.required)  ,   
    StoreName: new FormControl('', Validators.required)  ,   
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
}

interface ISingleStore{
 StoreMasterID :number;
 StoreType :string;
 StoreName:string;
 Name :string;
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
}