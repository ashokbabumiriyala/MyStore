import { Component, OnInit } from '@angular/core';
import {RegistrationServiceService} from '../../Shared/registration-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private registrationServiceService:RegistrationServiceService) { }

  ngOnInit() {
  }
  async validateUser(): Promise<void> {
    const dataObject = { ProviderUserName:'Ashok',Password:'8106939983'  };
    this.registrationServiceService.validateUser('ProviderLogin', dataObject)
      .subscribe((data: any) => {
       
      },
        (error: any) => {
          if (error.originalError.status === 401) {
          
          }         
        });
  }

}
