import { Component, OnInit } from '@angular/core';
import { RegistrationServiceService } from '../../Shared/registration-service.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IProviderDetails } from 'src/app/common/provider-details';
import { HelperService } from 'src/app/common/helper.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private registrationServiceService:RegistrationServiceService,
    private toastController:ToastController,
    private helperService:HelperService,
    private loadingController: LoadingController
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
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present(); 
    const dataObject = { ProviderUserName:this.providerName.value,Password:this.password.value };
    await  this.registrationServiceService.validateUser('ProviderLogin', dataObject)
      .subscribe((data: any) => {       
        sessionStorage.setItem("AuthToken",data.token);    
        sessionStorage.setItem("providerId", data.providerId);      
      let providerDetails:IProviderDetails
      providerDetails = {
        name: data.providerName, roleId: data.providerRoleId, 
        providerId: data.providerId,
        menus: data.menuItems, defaultMenuId: data.defaultMenuId       
      };    
       this.helperService.setProfileObs(providerDetails);
       this.presentToast("login success.","success");
       loadingController.dismiss();
      },
        (error: any) => {         
            this.presentToast("Invalid User Name or Password.","danger");
            loadingController.dismiss();
        });
     
  }

}
