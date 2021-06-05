import { Component, OnInit,ViewChild } from '@angular/core';
import { HelperService } from '../../common/helper.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import {File, FileEntry} from '@ionic-native/file/ngx';
import { NavController, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ServiceUploadService} from 'src/app/service-provider/services/service-upload.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
editService:boolean = false;
editMaster:boolean;
serviceProductsForm:FormGroup;
serviceLocationForm:FormGroup;
isFormSubmitted:boolean;
selectedDocs=[];
tempProducts=[];
services=[];
serviceProductList=[];
serviceId:number;
uploadedDocuments= [];
@ViewChild('selectedWebDocs') selectedWebDocs;
mobileApp:boolean;
  constructor(private   toastController:ToastController,
    private helperService:HelperService,
    private serviceUploadService:ServiceUploadService,
    private camera: Camera,
    private actionSheetController: ActionSheetController, private file: File,
    public alertController: AlertController) { }
ngOnInit() {
  if (sessionStorage.getItem('mobile') == 'true') {
    this.mobileApp = true;
  } else {
    this.mobileApp = false;
  }
  this.createServiceProductForm();
  this.createServiceLocationForm();
  this.serviceProductsList();
}
  editServiceInfo(rowdata:any){
    this.editService = true;
    this.uploadedDocuments= [];
    if(rowdata===null){
       this.serviceId=0;
    }else{
      this.serviceId=rowdata.serviceID;
      this.setForamADetailsToPage(rowdata);
      this.getUploadDocuments( this.serviceId);
    }
  }
  private getUploadDocuments(serviceProductsID:number) {  
    this.uploadedDocuments= [];
    const objData={Id: Number(serviceProductsID) ,searchKey:'ServicesUpload'}
          this.serviceUploadService.getUploadDocuments("UploadedDocuments", objData)
         .subscribe((data: any) => {
            this.uploadedDocuments=data;
         },
           (error: any) => {
            
           });
   }

  private setForamADetailsToPage(data: any): void {
    this.serviceProductsForm.patchValue({
      ServiceLocationID:String(data.serviceLocationID),
      Category:data.category,
      ServiceName: data.serviceName,
      DiscountType: data.discountType,
      Discount: data.discount,
      PriceBeforeDiscount: data.priceBeforeDiscount,
      PriceAfterDiscount: data.priceAfterDiscount
     
  });
  }
  async serviceProductsList(){
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present();
   const dataObject={ProviderId: Number(sessionStorage.getItem("providerId")),
   Mode:'Select',LocationId: Number(this.LocationID.value)};
   await this.serviceUploadService.serviceProductList('serviceListSelect', dataObject)
    .subscribe((data: any) => {
      this.services=data.serviceDropdown;
      this.serviceProductList = data.servicesProducts;
      loadingController.dismiss();
    },
    (error: any) => {
      loadingController.dismiss();
    });

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


  get LocationID(){
    return this.serviceLocationForm.get('LocationID');
  }

  private createServiceLocationForm(){
    this.serviceLocationForm = new FormGroup({
      LocationID: new FormControl('0')
    });
  }
  private createServiceProductForm(){
    this.serviceProductsForm = new FormGroup({
      ServiceLocationID: new FormControl('', Validators.required),
      Category: new FormControl('', Validators.required)  ,
      ServiceName: new FormControl('', Validators.required)  ,
      DiscountType: new FormControl(''),
      Discount: new FormControl('')  ,
      PriceBeforeDiscount: new FormControl(''),
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
    this.Discount.setErrors(null);
    this.PriceBeforeDiscount.setErrors(null);
    this.isFormSubmitted=true;
    if (this.serviceProductsForm.invalid) {
      return;
    }else{
      const serviceName=this.serviceId>0?"ServiceAndDocumentsUpdate":"ServiceAndDocumentsSave";
      const productObject= {ServiceId:Number(this.serviceId),ProviderId: Number(sessionStorage.getItem("providerId")),
      ServiceLocationID: Number(this.ServiceLocationID.value), Category:this.Category.value,
        ServiceName:this.ServiceName.value,
        DiscountType :this.DiscountType.value, Discount:Number(this.Discount.value),
        PriceBeforeDiscount:Number(this.PriceBeforeDiscount.value)
        ,PriceAfterDiscount:Number(this.PriceAfterDiscount.value), Files: this.selectedDocs};
        this.tempProducts.push(productObject);
        let formDataList = this.getFormData(this.tempProducts);
        const loadingController = await this.helperService.createLoadingController("loading");
        await loadingController.present();
        await this.serviceUploadService.uploadServiceDocument(serviceName, formDataList[0])
        .subscribe((data: any) => {
          loadingController.dismiss();
          this.tempProducts=[];
          this.serviceProductsForm.reset();
          this.selectedDocs = [];
          if (this.selectedWebDocs) {
            this.selectedWebDocs.nativeElement.value = "";
          }
          this.editService=false;
          this.isFormSubmitted=false;
          this.presentToast("Service saved Successfully","success");
          this.serviceProductsList();
        },
          (error: any) => {
            loadingController.dismiss();
          });
    }
  }

  changeBusiness(){
  this.serviceProductsList();
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
        }  else if (key == 'Files') {
          for (var j = 0; j < tempProducts[i][key].length; j++) {
            productFormData.append("files", tempProducts[i][key][j], 'ServiceImage' + j + '.jpg');
          }
        }
        else {
          productFormData.append(key, tempProducts[i][key]);
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

  selectedImgWeb(data){
    var files = data.target.files;
    for(let i = 0 ; i <files.length; i++) {
      if (files[i]) {
        var reader = new FileReader();
        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(files[i]);
      }
    }
  }
  async _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    let base64textString= btoa(binaryString);
    await this.getblobObject('data:image/jpeg;base64,' + base64textString)
   }
   ionViewDidLeave() {
    this.editService = false;
    this.serviceLocationForm.reset();
  }
  async presentAlertConfirm(rowdata:any,type:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Do you want to delete ?',
      message: rowdata.serviceName,
      buttons: [
        {
          text: 'Confirm',
          handler: () => {
           if(type==='document'){   
             this.deleteDocument(rowdata);
            
          }else{
            this.deleteService(rowdata.serviceID);
          }
          }
        },
        {
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


  async deleteService(serviceID:number){
    const loadingController = await this.helperService.createLoadingController("loading");
      await loadingController.present();
      const dataObject={ServiceLocationServiceId: serviceID};
      await this.serviceUploadService.serviceDelete('serviceLocationServiceDelete', dataObject)
      .subscribe((data: any) => {
        this.serviceProductsList();
        loadingController.dismiss();
      },
        (error: any) => {
          loadingController.dismiss();
        });
     }

     async deleteDocument(rowdata:any){     
      const loadingController = await this.helperService.createLoadingController("loading");
      
        await loadingController.present();
        const dataObject={searchKey:'ServicesUpload',ProductId: rowdata.servicesID,DocumentId:rowdata.id,filePath:rowdata.logo};
        await this.serviceUploadService.deleteDocument('DeleteDocument', dataObject)
        .subscribe((data: any) => {
          this.uploadedDocuments= [];
          loadingController.dismiss();
          this.getUploadDocuments(Number(rowdata.servicesID));
        },
          (error: any) => {
            loadingController.dismiss();
          });
    }
}
