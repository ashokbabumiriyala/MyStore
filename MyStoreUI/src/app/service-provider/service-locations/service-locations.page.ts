
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { HelperService } from '../../common/helper.service';
import { ServiceLocationService } from '../../service-provider/service-locations/service-location.service'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var google:any;
@Component({
  selector: 'app-service-locations',
  templateUrl: './service-locations.page.html',
  styleUrls: ['./service-locations.page.scss'],
})
export class ServiceLocationsPage implements OnInit {
  @ViewChild('selectedWebDocs') selectedWebDocs;
  editLocation: boolean;
  serviceMaster = [];
  businessType = [];
  deliveryType = [];
  providerLocationList = [];
  isFormSubmitted: boolean;
  title: string;
  serviceLocationForm: FormGroup;
  // iServiceLocations:IServiceLocations;
  locationId: number;
  mobileApp: boolean;
  selectedDocs = [];
  tempServiceLocation = [];
  latitude:any;
  longitude:any;
  geocoder:any;
  constructor(private toastController: ToastController,
    private helperService: HelperService, private serviceLocationService: ServiceLocationService,
    private camera: Camera,
    private actionSheetController: ActionSheetController, private file: File,
    private alertController:AlertController) {
      this.geocoder = new google.maps.Geocoder();
    }
  ngOnInit() {
    this.createserviceLocationForm();
    this.title = "Register";
    this.serviceLocationListSelect();

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
  private createserviceLocationForm() {
    this.serviceLocationForm = new FormGroup({
      ServiceMasterID: new FormControl('', Validators.required),
      BusinessType: new FormControl('', Validators.required),
      BusinessName: new FormControl('', Validators.required),
      BusinessManagerName: new FormControl('', Validators.required),
      ManagerID: new FormControl('', Validators.required),
      MobileNmuber: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      State: new FormControl('', Validators.required),
      PinCode: new FormControl('', Validators.required),
      LandMark: new FormControl('', Validators.required),
      FromTime: new FormControl('', Validators.required),
      ToTime: new FormControl('', Validators.required),
      DeliveryType: new FormControl('', Validators.required)
    });
  }

  //#region   list
  async serviceLocationListSelect() {
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present();
    const dataObject = { ProviderId: Number(sessionStorage.getItem("providerId")), Mode: 'Select' };
    await this.serviceLocationService.locationListSelect('serviceLocationSelect', dataObject)
      .subscribe((data: any) => {
        this.serviceMaster = data.serviceMaster;
        this.deliveryType = data.deliveryType;
        this.businessType = data.serviceType;
        this.providerLocationList = data.locationList;
        loadingController.dismiss();
      },
        (error: any) => {
          loadingController.dismiss();
        });
  }
  //#endregion
  async saveLocation(): Promise<void> {
    this.isFormSubmitted = true;
    if (this.serviceLocationForm.invalid) {
      return;
    } else {
      const loadingController = await this.helperService.createLoadingController("loading");
      await loadingController.present();
      let fullAddress = this.Address.value + ',' + this.LandMark.value + ',' + this.City.value + ','
    + this.State.value + ',' + this.PinCode.value;
    this.geocoder.geocode( { 'address': fullAddress}, (results, status) =>{
      if (status == google.maps.GeocoderStatus.OK) {
        this.latitude =  results[0].geometry.location.lat();
        this.longitude =  results[0].geometry.location.lng();
      } else {
        this.latitude = null;
        this.longitude = null;
      }
      const serviceLocationObject = {
        ServiceMasterID: Number(this.ServiceMasterID.value), BusinessType: Number(this.BusinessType.value),
        BusinessName: this.BusinessName.value, BusinessManagerName: this.BusinessManagerName.value.toString(), ManagerID: Number(this.ManagerID.value),
        MobileNmuber: this.MobileNmuber.value.toString(), Address: this.Address.value, City: this.City.value,
        State: this.State.value, PinCode: this.PinCode.value.toString(), LandMark: this.LandMark.value, FromTime: this.FromTime.value,
        ToTime: this.ToTime.value, DeliveryType: Number(this.DeliveryType.value),
        Id: this.locationId, Mode: this.title, Files: this.selectedDocs, Latitude: this.latitude, Longitude: this.longitude
      };
      this.tempServiceLocation.push(serviceLocationObject);
      this.selectedDocs = [];
      this.selectedWebDocs.nativeElement.value = "";
      let formDataList = this.getFormData(this.tempServiceLocation);

       this.serviceLocationService.locationSave('ServiceLocationSave', formDataList[0])
        .subscribe((data: any) => {
          loadingController.dismiss();
          this.presentToast("Service Location " + this.title + "  successfully.", "success");
          this.tempServiceLocation=[];
          this.serviceLocationForm.reset();
          this.editLocation = false;
          this.serviceLocationListSelect();
          this.isFormSubmitted = false;
        },
          (error: any) => {
            loadingController.dismiss();

          });
        });

    }
  }
  async presentToast(data: string, tostarColor: string) {
    const toast = await this.toastController.create({
      message: data,
      duration: 2000,
      position: 'bottom',
      color: tostarColor
    });
    toast.present();
  }
  async editServiceInfo(rowdata: any) {
    this.editLocation = true;
    if (rowdata == null) {
      this.locationId = 0;
      this.title = "Register";
    } else {
      const loadingController = await this.helperService.createLoadingController("loading");
      await loadingController.present();
      this.locationId = rowdata.id;
      this.title = "Update";
      const dataObject = { ProviderId: Number(sessionStorage.getItem("providerId")), Id: Number(rowdata.id), Mode: 'Edit' };
      await this.serviceLocationService.locationListSelect('serviceLocationSelect', dataObject)
        .subscribe((data: any) => {
          this.serviceMaster = [];
          this.deliveryType = [];
          this.businessType = [];
          this.serviceMaster = data.serviceMaster;
          this.deliveryType = data.deliveryType;
          this.businessType = data.serviceType;
          this.setForamADetailsToPage(data.locationList[0]);
          loadingController.dismiss();
        },
          (error: any) => {
            loadingController.dismiss();
          });
    }
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is a file URI
      let base64Img = 'data:image/jpeg;base64,' + imageData;
      this.getblobObject(base64Img);
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  async getblobObject(base64Data) {
    const base64 = await fetch(base64Data);
    const blob = await base64.blob();
    this.selectedDocs.push(blob);
  }

  private setForamADetailsToPage(data: any): void {
      this.serviceLocationForm.patchValue({
      ServiceMasterID: String(data.serviceMasterID),
      BusinessType: String(data.storeTypeId),
      BusinessName: data.businessName,
      BusinessManagerName: data.businessManagerName,
      ManagerID: Number(data.managerID),
      MobileNmuber: data.mobileNmuber,
      Address: data.address,
      City: data.city,
      State: data.state,
      PinCode: data.pinCode,
      LandMark: data.landMark,
      FromTime: data.fromTime,
      ToTime: data.toTime,
      DeliveryType: String(data.deliveryTypeId)
    });
  }
  selectedImgWeb(data) {
    console.log(data);
    var files = data.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(files[i]);
      }
    }
  }
  async _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    let base64textString = btoa(binaryString);
    await this.getblobObject('data:image/jpeg;base64,' + base64textString)
  }

  getFormData(tempProducts: any[]) {
    let formData = [];
    for (let i = 0; i < tempProducts.length; i++) {
      let productFormData = new FormData();
      for (var key of Object.keys(tempProducts[i])) {
        if (typeof (tempProducts[i][key]) == 'string') {
          productFormData.append(key, tempProducts[i][key]);
        } else if (typeof (tempProducts[i][key]) == 'number') {
          productFormData.append(key, tempProducts[i][key] + "");
        } else if(key == 'Files'){
          for (var j = 0; j < tempProducts[i][key].length; j++) {
            productFormData.append("files", tempProducts[i][key][j], 'ServiceLocationImage' + j + '.jpg');
          }
        } else {
          productFormData.append(key, tempProducts[i][key]);
        }
      }
      formData.push(productFormData);
    }
    return formData;
  }
  ionViewDidLeave() {
    this.editLocation = false;
    this.serviceLocationForm.reset();
  }
  async presentAlertConfirm(rowdata:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Do you want to delete',
      message: rowdata.businessName +' ?',
      buttons: [
       {
          text: 'Confirm',
          handler: () => {
           this.deleteLocation(rowdata.Id);
          }
        }
        , {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteLocation(locationId:number){
    const loadingController = await this.helperService.createLoadingController("loading");
      await loadingController.present();
      const dataObject={ServiceLocationId: locationId};
      await this.serviceLocationService.locationDelete('serviceLocationDelete', dataObject)
      .subscribe((data: any) => {
        this.serviceLocationListSelect();
        loadingController.dismiss();
      },
        (error: any) => {
          loadingController.dismiss();
        });
     }
}



// interface IServiceLocations{
//   ServiceMasterID :number;
//   BusinessType :number;
//   BusinessName:string;
//   BusinessManagerName :string;
//   ManagerID :number;
//   MobileNmuber :string;
//   Address :string;
//   City :string;
//   State:string;
//   PinCode :string;
//   LandMark :string;
//   FromTime :string;
//   ToTime :string;
//   DeliveryType:Number;
//   Id:number;
//   Mode:string;
//  }
