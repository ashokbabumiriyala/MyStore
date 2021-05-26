import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService }  from 'src/app/common/helper.service';
import {SignUpService} from 'src/app/Shared/signup/sign-up.service';
import { NavController, ToastController } from '@ionic/angular';
import { Router, NavigationStart } from '@angular/router';
import { ConfirmPasswordValidation } from 'src/app/common/must-match.validator';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { IfStmt } from '@angular/compiler';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  

  constructor(private helperService:HelperService,
    private toastController:ToastController,public alertController: AlertController,
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
  get agreed() {
    return this.signUpFormGroup.get('agreed');
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
      confirmPassword:new FormControl('', Validators.required),
      agreed:new FormControl('false',Validators.required)
    },
    {
      validators: [ConfirmPasswordValidation.ConfirmPassword
      ]
    }
  );
}
async register(): Promise<void>{
  if(this.signUpFormGroup.controls.agreed.value==="false" ||this.signUpFormGroup.controls.agreed.value===false){  
    this.signUpFormGroup.controls['agreed'].setErrors({'error': true});
  }
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
      if(data.operationStatusDTO.transactionStatus==10){
        loadingController.dismiss();
        this.presentToast("This username or mobile number already exists.","danger");
      }else{
        this.presentToast("Registration is successful.","success");
        const index =this.providerType.findIndex(x => x.value === Number(this.RoleID.value));     
        if (sessionStorage.getItem('mobile') == 'true') {
          this.fcm.subscribeToTopic(this.providerType[index].text);
        }
        this.signUpFormGroup.reset();
        loadingController.dismiss();
        this.router.navigate(['login']);
      }     
    },
      (error: any) => {
        loadingController.dismiss();

      });
      
}
async presentAlertTermsConditions() {
  const alert = await this.alertController.create({
    cssClass: 'terms-conditions',
    header: 'Terms And Conditions',
    message: `<b>Terms and Conditions (“Terms”)</b>
    <p>Please read these terms and conditions carefully before using My3Karrt mobile apps or website operated by the
      company- Down South Empire Pvt. Ltd.</p>
    <p>Your access to and use of the service is conditioned on your acceptance of and compliance with these terms.
       These terms apply to all visitors, users and others who access or use this service.</p>
    <b>Subscriptions:</b>
    <p>Services provided by My3Karrt through this app are billed on a subscription basis. You will be billed in
       advance on a recurring basis.</p>
    <b>Confidential Information:</b>
    <p>The bank details of each merchant or service provider is required for the sake of directing customers’ 
       transaction amount directly to the Merchant or Service provider account.</p>
    <p>Hence, after signing up, every Merchant and Service Provider have to provide the Bank information for the 
       sake of KYC verification and online transactions. My3Karrt is responsible for the confidentiality of any 
       information provided by the Merchants and Service Providers.</p>
    <b>Access:</b>
    <p>My3Karrt would require access to the business location or device location in order to display the business 
    information to the customer. Camera or Photo library access would also be required in order to upload images.</p>
    `,    
    buttons: [
      {
        text: 'OK',
        role: 'OK',
        cssClass: 'agree-button-ok'        
      },
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'agree-button-cancel',
        handler: () => {
        }
      }
    ]
  });

  await alert.present();
}
dismisstAlertTermsConditions() {
const ele = document.getElementsByClassName('terms-conditions')[0] as HTMLElement;
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
