import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IProviderDetails} from 'src/app/common/provider-details';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
 iProviderDetails:IProviderDetails;
// public providerSource = new BehaviorSubject<IProviderDetails>(this.iProviderDetails)
// providerDetails = this.providerSource.asObservable();

constructor(private loadingController:LoadingController, private toastController: ToastController,
  private alertController: AlertController) { }


private profileObs$: BehaviorSubject<IProviderDetails> = new BehaviorSubject(null);

getProfileObs(): Observable<any> {
    return this.profileObs$.asObservable();
}

setProfileObs(profile: IProviderDetails) {
    this.profileObs$.next(profile);
}

async createLoadingController(displayMessage:string): Promise<any> {
  const loadingController = await this.loadingController.create({
      message: displayMessage
  });
  return loadingController;
}


prepareDropDownData(items: any): iDropdown[] {
  let iDropdownItems: iDropdown[];
  const defaultSelectText = '-- Please Select --';
  iDropdownItems = [{ label: defaultSelectText, value: null }];
  if (items) {
    for (const item of items) {
      iDropdownItems.push({ label: item.text, value: item.value });
    }
  }
  return iDropdownItems;
}

async presentToast(data: string, toastColor:string) {
  const toast = await this.toastController.create({
    message: data,
    duration: 2000,
    position: 'bottom',
    color: toastColor
  });
  toast.present();
}
  async presentAlertConfirm(message) {
    let result;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: message,
      buttons: [
      {
          text: 'Confirm',
          handler: () => {
            // console.log('Confirm Okay');
            alert.dismiss(true);
            return false;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
            alert.dismiss(false);
            return false;
          }
        }
      ]
    });
    await alert.present();
    await alert.onDidDismiss().then((data) => {
      result = data;
    })
    return result;
  }
}

export interface iDropdown {
  label: string;
  value: number;
}
