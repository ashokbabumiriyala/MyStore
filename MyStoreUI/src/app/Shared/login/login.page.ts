import { Component, OnInit } from '@angular/core';
import { RegistrationServiceService } from '../../Shared/registration-service.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IProviderDetails } from 'src/app/common/provider-details';
import { HelperService } from 'src/app/common/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private registrationServiceService:RegistrationServiceService,
    private toastController:ToastController,
    private helperService:HelperService,
   ) { }
  loginFormGroup: FormGroup;
  isFormSubmitted:boolean;
  menus: any[];
  ngOnInit() {
    this.createloginForm();
  }
  get providerName() {
    return this.loginFormGroup.get('providerName');
  }
  get password() {
    return this.loginFormGroup.get('password');
  }
  private createloginForm() {   
    this.loginFormGroup = new FormGroup({
      providerName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)      
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
  async validateUser(): Promise<void> {   
    this.isFormSubmitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }    
    const dataObject = { ProviderUserName:this.providerName.value,Password:this.password.value };
    this.registrationServiceService.validateUser('ProviderLogin', dataObject)
      .subscribe((data: any) => {       
        sessionStorage.setItem("AuthToken",data.token);       
      let providerDetails:IProviderDetails
      providerDetails = {
        name: data.providerName, roleId: data.providerRoleId, 
        providerId: data.providerId,
        menus: data.menuItems, defaultMenuId: data.defaultMenuId       
      };  
       this.helperService.setProfileObs(providerDetails);
       this.presentToast("login success.","success");
      },
        (error: any) => {         
            this.presentToast("Invalid User Name or Password.","danger");             
        });
  }

}
