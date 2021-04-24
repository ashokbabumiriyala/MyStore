import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreProductService } from '../store-products/store-product.service'
import { NavController, ToastController } from '@ionic/angular';
import {HelperService} from '../../common/helper.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
declare var file;

@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.page.html',
  styleUrls: ['./store-products.page.scss'],
})
export class StoreProductsPage implements OnInit {
editProduct:boolean;
editMaster:boolean;
storeProductsForm:FormGroup;
isFormSubmitted:boolean;
showTempList:boolean;
tempProducts=[];
iProductUpload: IProductUpload;
title:string;
storeProductsData= [];
stores=[];

// const options: CameraOptions = {
//   quality: 100,
//   destinationType: this.camera.DestinationType.FILE_URI,
//   encodingType: this.camera.EncodingType.JPEG,
//   mediaType: this.camera.MediaType.PICTURE
// }
constructor(private storeProductService:StoreProductService,
  private   toastController:ToastController,
  private helperService:HelperService,
  private camera: Camera

  ) { }



  ngOnInit() {
    this.createStoreProductForm();
    this.title="Register";   
    this.storeProductsList();
  }
  get StoreID(){
    return this.storeProductsForm.get('StoreID');
  }
  get Category(){
    return this.storeProductsForm.get('Category');
  }
  get ProductName(){
    return this.storeProductsForm.get('ProductName');
  }
  get Units(){
    return this.storeProductsForm.get('Units');
  }
  get Quantity(){
    return this.storeProductsForm.get('Quantity');
  }
  get DiscountType(){
    return this.storeProductsForm.get('DiscountType');
  }
  get Discount(){
    return this.storeProductsForm.get('Discount');
  }
  get PriceBeforeDiscount(){
    return this.storeProductsForm.get('PriceBeforeDiscount');
  }
  get PriceAfterDiscount(){
    return this.storeProductsForm.get('PriceAfterDiscount');
  }
  async storeProductsList(){
    const loadingController = await this.helperService.createLoadingController("loading");
      await loadingController.present();  
      const selectedStoreId=this.StoreID.value;     
      const dataObject={ProviderId: Number(sessionStorage.getItem("providerId")),Mode:'Select',StoreId:0};
      this.storeProductService.storeProductList('ProviderStoreProductsSelect', dataObject)
      .subscribe((data: any) => {
        this.stores=data.storeDropdown;
        this.storeProductsData =data.storeProducts;        
      },
        (error: any) => {
        });
        await loadingController.dismiss();
    }
uploadDoc() {

  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }


  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    console.log(base64Image);
   }, (err) => {
    // Handle error
   });

      // this.chooser.getFile()
      //   .then((file) => {
      //     this.file.resolveLocalFilesystemUrl(file.uri).then((entry: FileEntry) => {
      //       entry.file(file => {  
      //         const formData = new FormData();
      //         const reader = new FileReader();
      //         reader.onload = () => {
      //           const blob = new Blob([reader.result], {
      //             type: file.type
      //           });
      //           formData.append('Files', blob, file.name);
      //           // this.uploadDocumentService.uploadPhoto('RasidInspectionDocumentsUpload', formData)
      //           //   .subscribe((result: any) => {
      //           //     if (result.responseCode === 6000) {
      //           //       // Get Updated Documents List
      //           //       this.getUploadDocumentsList();
      //           //     } else {
      //           //       this.sharedService.presentToast('Error Code: ' + result.responseCode);
      //           //     }  
      //           //   },
      //           //     () => {
      //           //       // this.showLoadingIndicator = false;
      //           //       this.sharedService.presentToast(this.translate.instant('Common.somethingWentWrong'));
      //           //       this.sharedService.navigateToLogin();
      //           //     });
      //         };
      //         reader.readAsArrayBuffer(file);  
      //       });
      //     });
      //   })
      //   .catch((error: any) => console.error(error));
}
private createStoreProductForm(){
  this.storeProductsForm = new FormGroup({
    StoreID: new FormControl('', Validators.required),
    Category: new FormControl('', Validators.required)  ,   
    ProductName: new FormControl('', Validators.required)  ,   
    Units: new FormControl('', Validators.required),
    Quantity: new FormControl('', Validators.required)  ,  
    DiscountType: new FormControl('', Validators.required),
    Discount: new FormControl('', Validators.required) ,  
    PriceBeforeDiscount: new FormControl('', Validators.required) ,    
    PriceAfterDiscount: new FormControl('', Validators.required)
  });
}
addProduct():void{
  this.isFormSubmitted=true;
  if (this.storeProductsForm.invalid) {
    return;
  }else{
    this.isFormSubmitted=false;
    const serialNumber:number=this.tempProducts.length+1;
    const productObject= {slNo:Number(serialNumber), StoreID:this.StoreID.value, Category:this.Category.value, 
      ProductName:this.ProductName.value,
      Units:this.Units.value,Quantity:Number(this.Quantity.value),
      DiscountType :this.DiscountType.value, Discount:Number(this.Discount.value),PriceBeforeDiscount:Number(this.PriceBeforeDiscount.value)
       ,PriceAfterDiscount:Number(this.PriceAfterDiscount.value)};
       this.tempProducts.push(productObject);      
       this.showTempList=true;
       this.storeProductsForm.reset();
       this.uploadDoc();
      //  this.presentToast("Store " + this.title+ "  successfully.","success");  
  }
}
uploadProduct():void{
  this.uploadDoc();
  this.iProductUpload={
    tempProducts:[]
  }
  Object.assign(this.iProductUpload.tempProducts,this.tempProducts);
  this.storeProductService.storeProductSave('StoreProductSave', this.iProductUpload)
  .subscribe((data: any) => {     
    this.tempProducts=[];
    this.showTempList=false;
    this.editProduct = false;
  },
    (error: any) => {        
                 
    });
}
deleteProduct(rowdata:any){ 
  this.tempProducts.forEach((element,index)=>{   
    if(Number(element.slNo) ==Number(rowdata.slNo)){    
     this.tempProducts.splice(index,1);
     
    }
 });
 if(this.tempProducts.length===0){
  this.showTempList=false;
 }
}
editProductInfo(){
	  this.editProduct = true;
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
interface IProductUpload{
 tempProducts:any;
}

