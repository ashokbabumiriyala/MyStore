import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService }  from 'src/app/common/helper.service';
import {SignUpService} from 'src/app/Shared/signup/sign-up.service';
import { NavController, ToastController } from '@ionic/angular';
import { Router, NavigationStart } from '@angular/router';
import { ConfirmPasswordValidation } from 'src/app/common/must-match.validator';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private helperService:HelperService,
    private toastController:ToastController,
    private router:Router, private signUpService:SignUpService, public fcm: FCM) { }
  isignUp:IsignUp;
  signUpFormGroup:FormGroup;
  providerType=[];
  isFormSubmitted:boolean;
  ngOnInit() {
    this.signUpFormGroupCreate();
    this.providerTypeDropDown();
  }
  get RoleID() {
    return this.signUpFormGroup.get('RoleID');
  }
  get Password() {
    return this.signUpFormGroup.get('Password');
  }
  get Email() {
    return this.signUpFormGroup.get('Email');
  }

  get MobileNumber() {
    return this.signUpFormGroup.get('MobileNumber');
  }

  get ProviderName() {
    return this.signUpFormGroup.get('ProviderName');
  }
  get Category() {
    return this.signUpFormGroup.get('Category');
  }
get confirmPassword(){
  return this.signUpFormGroup.get('confirmPassword');
}

  private signUpFormGroupCreate() {
    this.signUpFormGroup=new  FormGroup({
      ProviderName: new FormControl('', Validators.required),
      Category: new FormControl('', Validators.required)  ,
      RoleID: new FormControl('', Validators.required),
      MobileNumber: new FormControl('', Validators.required)  ,
      Email: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
      confirmPassword:new FormControl('', Validators.required)
    },
    {
      validators: [ConfirmPasswordValidation.ConfirmPassword
      ]
    }
  );
}
async register(): Promise<void>{
  this.isFormSubmitted = true;
    if (this.signUpFormGroup.invalid) {
      return;
    }
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present();
    this.isignUp = {
      ProviderName :this.ProviderName.value,
      Category :this.Category.value,
      RoleID :Number(this.RoleID.value),
      MobileNumber :this.MobileNumber.value.toString(),
      Email :this.Email.value,
      Password:this.Password.value,
      pushToken: sessionStorage.getItem('PushToken')
    };

    await  this.signUpService.providerSignUp('ProviderSignupSave', this.isignUp)
    .subscribe((data: any) => {
      this.signUpFormGroup.reset();
      this.router.navigate(['login']);
      this.presentToast("Registration successfully.","success");
      const providerIndex = this.providerType.findIndex(this.RoleID.value)
      this.fcm.subscribeToTopic(this.providerType[providerIndex].text);
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
  async providerTypeDropDown(){
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present();
    await this.signUpService.providerType('provideTypeDropDown')
    .subscribe((data: any) => {
     this.providerType=data;
     loadingController.dismiss();
    },
      (error: any) => {
        loadingController.dismiss();
      });
      
  }
}
interface  IsignUp{
 ProviderName :string;
 Category :string;
 RoleID :number;
 MobileNumber :string;
 Email :string;
 Password:string;
 pushToken:string;
}
