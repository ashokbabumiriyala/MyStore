import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../common/helper.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import {File, FileEntry} from '@ionic-native/file/ngx';
import { NavController, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ServiceUploadService} from 'src/app/service-provider/services/service-upload.service';
@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
editService:boolean = false;
editMaster:boolean;
serviceProductsForm:FormGroup;
isFormSubmitted:boolean;
selectedDocs=[];
tempProducts=[];
  constructor(private   toastController:ToastController,
    private helperService:HelperService,
    private serviceUploadService:ServiceUploadService,
    private camera: Camera,
    private actionSheetController: ActionSheetController, private file: File) { }

ngOnInit() {
  this.createServiceProductForm();
}
  editServiceInfo(){
	  this.editService = true;
  }
  get ServiceLocationID(){
    return this.serviceProductsForm.get('ServiceLocationID');
  }
  get Category(){
    return this.serviceProductsForm.get('Category');
  }
  get ServiceName(){
    return this.serviceProductsForm.get('ServiceName');
  }
  get DiscountType(){
    return this.serviceProductsForm.get('DiscountType');
  }
  get Discount(){
    return this.serviceProductsForm.get('Discount');
  }
  get PriceBeforeDiscount(){
    return this.serviceProductsForm.get('PriceBeforeDiscount');
  }
  get PriceAfterDiscount(){
    return this.serviceProductsForm.get('PriceAfterDiscount');
  }
  private createServiceProductForm(){
    this.serviceProductsForm = new FormGroup({
      ServiceLocationID: new FormControl('', Validators.required),
      Category: new FormControl('', Validators.required)  ,
      ServiceName: new FormControl('', Validators.required)  ,
      DiscountType: new FormControl('', Validators.required),
      Discount: new FormControl('', Validators.required)  ,
      PriceBeforeDiscount: new FormControl('', Validators.required),
      PriceAfterDiscount: new FormControl('', Validators.required)       
    });
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

  async getblobObject(base64Data){
    const base64 = await fetch(base64Data);
    const blob = await base64.blob();
    this.selectedDocs.push(blob);
  }
  async uploadService():Promise<void> {
   
    this.isFormSubmitted=true;
    if (this.serviceProductsForm.invalid) {
      return;
    }else{
      this.isFormSubmitted=false;
     
      const productObject= {ServiceLocationID: Number(this.ServiceLocationID.value), Category:this.Category.value,
        ServiceName:this.ServiceName.value,       
        DiscountType :this.DiscountType.value, Discount:Number(this.Discount.value),
        PriceBeforeDiscount:Number(this.PriceBeforeDiscount.value)
        ,PriceAfterDiscount:Number(this.PriceAfterDiscount.value), Files: this.selectedDocs};
        this.tempProducts.push(productObject);       
        this.serviceProductsForm.reset();
        this.selectedDocs = [];
        this.isFormSubmitted=true;

        let formDataList = this.getFormData(this.tempProducts);
        const loadingController = await this.helperService.createLoadingController("loading");
        await loadingController.present();
        await this.serviceUploadService.uploadServiceDocument('ServiceAndDocumentsSave', formDataList[0])
        .subscribe((data: any) => {
          this.tempProducts=[];    
          this.presentToast("Service saved Successfully","success");
          loadingController.dismiss();
        },
          (error: any) => {
            loadingController.dismiss();
          });

    }
  }

  getFormData(tempProducts:any[]){
    let formData = [];
    for(let i = 0; i < tempProducts.length; i++){
      let productFormData = new FormData();
      for (var key of Object.keys(tempProducts[i])) {
        if (typeof(tempProducts[i][key]) == 'string'){
          productFormData.append(key, tempProducts[i][key]);
        } else if (typeof(tempProducts[i][key]) == 'number'){
          productFormData.append(key, tempProducts[i][key] + "");
        } else {
          for (var j = 0; j < tempProducts[i][key].length; j++) {
            productFormData.append("files", tempProducts[i][key][j], 'ServiceImage' + j + '.jpg');
          }
        }
      }
      formData.push(productFormData);
    }
    return formData;
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
}