import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-locations',
  templateUrl: './service-locations.page.html',
  styleUrls: ['./service-locations.page.scss'],
})
export class ServiceLocationsPage implements OnInit {
editService:boolean = false;
editMaster:boolean;
serviceMaster=[];
businessType=[];
deliveryType=[];
isFormSubmitted:boolean;
title:string;
serviceLocationForm:FormGroup;
  constructor() {}
  fromDate = "2021-03-10T09:30";
  toDate = "2021-03-10T21:30";
  ngOnInit() {
    this.createserviceLocationForm();
    this.title="Register";  
    
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

editServiceInfo(){
	this.editService = true;
}
}




interface ISingleStore{
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
