import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { HelperService } from 'src/app/common/helper.service';
import {DeliveryManagmentService}  from '../../delivery-management/delivery-managment.service';

@Component({
  selector: 'app-add-executive',
  templateUrl: './add-executive.component.html',
  styleUrls: ['./add-executive.component.scss'],
})
export class AddExecutiveComponent implements OnInit {
  editExecutive: boolean;
  isFormSubmitted:boolean;
  executiveFormGroup:FormGroup;
  iExecutive:IExecutive;
 executiveList= [];
 title:string;
 executiveId:number;
  constructor(private   toastController:ToastController,
    private deliveryManagmentService:DeliveryManagmentService,
    private helperService:HelperService) { }

  ngOnInit() { 
    this.createexecutiveForm();
    this.executivesListSelect();
  }

  get Password(){
    return this.executiveFormGroup.get('Password');
  }
  get Username(){
    return this.executiveFormGroup.get('Username');
  }
  get MobileNmuber(){
    return this.executiveFormGroup.get('MobileNmuber');
  }
  get Pincode(){
    return this.executiveFormGroup.get('Pincode');
  }
  get State(){
    return this.executiveFormGroup.get('State');
  }
  get City(){
    return this.executiveFormGroup.get('City');
  }

  get Address(){
    return this.executiveFormGroup.get('Address');
  }

  get Name(){
    return this.executiveFormGroup.get('Name');
  }
  private createexecutiveForm() {
    
    this.executiveFormGroup = new FormGroup({
      Name: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required)  ,
      City: new FormControl('', Validators.required)  ,
      State: new FormControl('', Validators.required),
      Pincode: new FormControl('', Validators.required)  ,
      MobileNmuber: new FormControl('', Validators.required),
      Username: new FormControl('', Validators.required) ,
      Password: new FormControl('', Validators.required) ,
     
    });
  }
  async executivesListSelect(){
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present();    
    await this.deliveryManagmentService.deliveryExecutiveSelect('DeliveryExecutiveSelect')
    .subscribe((data: any) => {

      if(data.length>0){
        this.executiveList=data;
      }else{
        this.executiveList=[];
      }
      loadingController.dismiss();
    },
      (error: any) => {
        loadingController.dismiss();
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

  async addExecutive() {

    this.isFormSubmitted=true;
    if (this.executiveFormGroup.invalid) {
      return;
    }
    else{
      const serviceName=this.executiveId>0?"UpdateDeliveryExecutive":"DeliveryExecutiveInsert";
      const message=this.executiveId>0?"Executive Update Successful.":"Executive Registration Successful.";
      const loadingController = await this.helperService.createLoadingController("loading");
      await loadingController.present();
      this.iExecutive = {
        Id:this.executiveId,
        name :this.Name.value,
        address :this.Address.value,
        city:this.City.value,
        state :this.State.value,
        pincode :this.Pincode.value.toString() ,
        mobileNumber:this.MobileNmuber.value.toString(),
        userName :this.Username.value,
        password :this.Password.value,
      };
      await this.deliveryManagmentService.saveDeliveryExecutive(serviceName,this.iExecutive)
      .subscribe((data: any) => {  
        if(data.operationStatusDTO.transactionStatus==10){
          loadingController.dismiss();
          this.presentToast("This username or mobile number already exists.","danger");
        }else{
          this.isFormSubmitted=false;
        this.executiveId=0;      
        this.presentToast(message,"success");
        this.executiveFormGroup.reset();
        loadingController.dismiss();
        this.editExecutive= false;
        this.executivesListSelect();
        }
      },
        (error: any) => {
          loadingController.dismiss();
        });
    }
  }
  ionViewDidLeave() {
    this.executiveId=0;
    this.title="Add Executive";
    this.editExecutive = false;
  }
  add() {
    this.title="Add Executive";
    this.editExecutive = true;
  }
  deleteExecutive() {
    alert('executive deleted');
  }
  editExecutiveData(data:any) {   
    this.setForamADetailsToPage(data)
    this.executiveId=data.id;
    this.title="Update Executive";
    this.editExecutive = true;
  }


  private setForamADetailsToPage(data: any): void {
    this.executiveFormGroup.patchValue({
      Name:data.name,
      Address:data.address,
      City: data.city,
      State: data.state,
      Pincode: data.pincode,
      MobileNmuber: data.mobileNumber,
      Username: data.userName,
      Password: data.password     
  });
  }
}
interface IExecutive{
  Id:number;
  name :string;
  address :string;
  city:string;
  state :string;
  pincode :string;
  mobileNumber :string;
  userName :string;
  password :string; 
}