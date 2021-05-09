import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreProductService } from '../store-products/store-product.service'
import { NavController, ToastController } from '@ionic/angular';
import {HelperService} from '../../common/helper.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import {File, FileEntry} from '@ionic-native/file/ngx';

@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.page.html',
  styleUrls: ['./store-products.page.scss'],
})
export class StoreProductsPage implements OnInit {
  @ViewChild('selectedWebDocs') selectedWebDocs;
editProduct:boolean;
editMaster:boolean;
storeProductsForm:FormGroup;
isFormSubmitted:boolean;
showTempList:boolean;
tempProducts=[];
title:string;
storeProductsData= [];
stores=[];
tempDocs=[];
selectedDocs=[];
mobileApp:boolean;
constructor(private storeProductService:StoreProductService,
  private   toastController:ToastController,
  private helperService:HelperService,
  private camera: Camera,
  private actionSheetController: ActionSheetController, private file: File) { }

  ngOnInit() {
    if (sessionStorage.getItem('mobile') == 'true') {
      this.mobileApp = true;
    } else {
      this.mobileApp = false;
    }
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
   await this.storeProductService.storeProductList('ProviderStoreProductsSelect', dataObject)
    .subscribe((data: any) => {
      this.stores=data.storeDropdown;
      this.storeProductsData = data.storeProducts;
      loadingController.dismiss();
    },
    (error: any) => {
      loadingController.dismiss();
    });

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
  private createStoreProductForm(){
    this.storeProductsForm = new FormGroup({
      StoreID: new FormControl('', Validators.required),
      Category: new FormControl('', Validators.required)  ,
      ProductName: new FormControl('', Validators.required)  ,
      Units: new FormControl('', Validators.required),
      Quantity: new FormControl('', Validators.required)  ,
      DiscountType: new FormControl(''),
      Discount: new FormControl('') ,
      PriceBeforeDiscount: new FormControl('') ,
      PriceAfterDiscount: new FormControl('', Validators.required)
    });
  }

  async uploadProduct():Promise<void> {  
    this.Discount.setErrors(null);
    this.PriceBeforeDiscount.setErrors(null);
    this.isFormSubmitted=true;
    if (this.storeProductsForm.invalid || this.selectedDocs.length == 0) {
      return;
    }else{
      this.isFormSubmitted=false;
      const serialNumber:number=this.tempProducts.length+1;
      const productObject= {StoreID:this.StoreID.value, Category:this.Category.value,
        ProductName:this.ProductName.value,
        Units:this.Units.value,Quantity:Number(this.Quantity.value),
        DiscountType :this.DiscountType.value, Discount:Number(this.Discount.value),
        PriceBeforeDiscount:Number(this.PriceBeforeDiscount.value)
        ,PriceAfterDiscount:Number(this.PriceAfterDiscount.value), Files: this.selectedDocs};       
        this.tempProducts.push(productObject);
        this.showTempList=true;
        this.storeProductsForm.reset();
        this.selectedDocs = [];
        this.selectedWebDocs.nativeElement.value = "";
        let formDataList = this.getFormData(this.tempProducts);
        const loadingController = await this.helperService.createLoadingController("loading");
        await loadingController.present();
        await this.storeProductService.storeProductSave('StoreProductSave', formDataList[0])
        .subscribe((data: any) => {
          this.tempProducts=[];
          this.showTempList=false;
          this.editProduct = false;
          this.presentToast("Product saved Successfully","success");
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
            productFormData.append("files", tempProducts[i][key][j], 'ProductImage' + j + '.jpg');
          }
        }
      }
      formData.push(productFormData);
    }
    return formData;
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
  addNewProduct() {
    this.editProduct = true;
    this.editMaster = !this.editMaster;
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
    console.log(data);
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
    this.editProduct = false;
    this.storeProductsForm.reset();
    this.selectedDocs = [];
    this.selectedWebDocs.nativeElement.value = "";
  }
}


