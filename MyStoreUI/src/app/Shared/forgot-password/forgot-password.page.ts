import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { promise } from 'protractor';
import { NavController, ToastController } from '@ionic/angular';
import {HelperService} from '../../common/helper.service';
import {ForgotPasswordServiceService} from '../forgot-password/forgot-password-service.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  userName:boolean;
  forgotForm:FormGroup;
  isFormSubmitted:boolean;
  methodName:string;
  value:string;
  constructor(private route: ActivatedRoute,  
    private   toastController:ToastController,
    private helperService:HelperService,
    private forgotPasswordService:ForgotPasswordServiceService) { }
  ngOnInit() {   
    this.route.queryParams.subscribe(params => {
        this.userName = JSON.parse(params.userName);
      }
    );
    this.createStoreProductForm();
  }
  get forGotuserName(){
    return this.forgotForm.get('forGotuserName');
  }
  get forGotPassword(){
    return this.forgotForm.get('forGotPassword');
  }
  private createStoreProductForm(){
    this.forgotForm = new FormGroup({
      forGotuserName: new FormControl('', Validators.required),
      forGotPassword: new FormControl('', Validators.required)    
    });
  }
  async  submit():Promise<void> {  
    this.isFormSubmitted=true;
    if(this.userName===true){   
      this.forGotPassword.setErrors(null);  
      this.methodName="ForgotUserName";
      this.value=this.forGotuserName.value;
    }
    else{    
      this.forGotuserName.setErrors(null);   
      this.methodName="ForgotPassword"; 
      this.value=this.forGotPassword.value;
    }   
    if (this.forgotForm.invalid) {
      return;
    }else{
        this.isFormSubmitted=false;
        const loadingController = await this.helperService.createLoadingController("loading");
        await loadingController.present();
        const dataObject={searchKey:this.value}
        await this.forgotPasswordService.forGotDetails(this.methodName,dataObject)
        .subscribe((data: any) => {  
          if(data.provideDetails.length>0){
            this.presentToast("Information has been sent to registered mobile number","success");
          } else{
            this.presentToast("Invalid credentials","warning");
          } 
          loadingController.dismiss();
        },
          (error: any) => {
            loadingController.dismiss();
          });
    }

      this.isFormSubmitted=false;
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
  setValidations(){
    this.isFormSubmitted=false;
    this.forGotuserName.value('');
    this.forGotPassword.value('');
  }

}
