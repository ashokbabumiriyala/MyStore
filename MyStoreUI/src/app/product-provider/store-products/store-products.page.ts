import { Component, OnInit, ViewChild,NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreProductService } from '../store-products/store-product.service'
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { HelperService} from '../../common/helper.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { File, FileEntry} from '@ionic-native/file/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Console } from 'console';
import { ModalController } from '@ionic/angular';

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
storeForm:FormGroup;
isFormSubmitted:boolean;
showTempList:boolean;
tempProducts=[];
title:string;
storeProductsData= [];
stores=[];
tempDocs=[];
selectedDocs=[];
mobileApp:boolean;
productId:number;
uploadedDocuments= [];
public searchStore: string = "";
public masterData:any = [];
constructor(private storeProductService:StoreProductService,
  private   toastController:ToastController,
  private helperService:HelperService,
  private camera: Camera,
  private actionSheetController: ActionSheetController, private file: File,
  private alertController:AlertController,
  public modalController: ModalController,
  private ngZone:NgZone) { }

  ngOnInit() {
    if (sessionStorage.getItem('mobile') == 'true') {
      this.mobileApp = true;
    } else {
      this.mobileApp = false;
    }
    this.createStoreProductForm();
    this.createStoreForm();
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
  get SearchStoreId(){
    return this.storeForm.get('SearchStoreId');
  }

  get AvailableQty(){
    return this.storeProductsForm.get('AvailableQty');
  }

  get Description(){
    return this.storeProductsForm.get('Description');
  }

  async presentModal(rowdata:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Update Quantity',
      message: 'Available Quantity:' +  rowdata.availableQty,
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          id: 'availableQty',
          value: 0 ,
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          handler: (currentQuantity) => {
           this.updateStockQuantity(rowdata,currentQuantity.quantity)
          }
        }
      ]
    });

    await alert.present();

  }


  async updateStockQuantity(rowdata:any,currentQuantity:number):Promise<void> {
      this.isFormSubmitted=false;
      const dataObj={ProductId:rowdata.id,Status:true,AvlQuantity : Number(currentQuantity)};
        await this.storeProductService.updateInventory("updateInventoryQuantity", dataObj)
        .subscribe((data: any) => {
          this.storeProductsList();
        },
          (error: any) => {
        });
    // }
  }

  async storeProductsList(){
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present();
    const dataObject={ProviderId: Number(sessionStorage.getItem("providerId")),Mode:'Select',StoreId:Number(this.SearchStoreId.value)};
   await this.storeProductService.storeProductList('ProviderStoreProductsSelect', dataObject)
    .subscribe((data: any) => {     
      loadingController.dismiss();    
      this.ngZone.run(() => {
        this.stores=data.storeDropdown;
        this.storeProductsData = data.storeProducts;
        Object.assign(this.masterData,this.storeProductsData);
    });
    },
    (error: any) => {
      loadingController.dismiss();
    });
  }
  filterItems() {
    this.masterData = this.storeProductsData.filter(item => {
      return item.productName.toLowerCase().indexOf(this.searchStore.toLowerCase()) > -1;
    });
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 40,
      targetWidth: 600,
      targetHeight: 600,
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
      PriceAfterDiscount: new FormControl('', Validators.required),
      AvailableQty: new FormControl('', Validators.required),
      Description: new FormControl('')
    });
  }

  async uploadProduct():Promise<void> {
    this.Description.setErrors(null);
    this.Discount.setErrors(null);
    this.PriceBeforeDiscount.setErrors(null);
    this.isFormSubmitted=true;
    if (this.storeProductsForm.invalid) {
      return;
    }else{
      const serviceName=this.productId>0?"StoreProductUpdate":"StoreProductSave";
      this.isFormSubmitted=false;
      const productObject= {ProductId: Number(this.productId),ProviderId: Number(sessionStorage.getItem("providerId")),
        StoreID:this.StoreID.value, Category:this.Category.value,
        ProductName:this.ProductName.value,
        Units:this.Units.value,Quantity:Number(this.Quantity.value),
        DiscountType :this.DiscountType.value, Discount:Number(this.Discount.value),
        PriceBeforeDiscount:Number(this.PriceBeforeDiscount.value)
        ,PriceAfterDiscount:Number(this.PriceAfterDiscount.value),AvailableQty:Number(this.AvailableQty.value),
        Description:this.Description.value, Files: this.selectedDocs};
        this.tempProducts.push(productObject);
        this.showTempList=true;
        let formDataList = this.getFormData(this.tempProducts);
        const loadingController = await this.helperService.createLoadingController("loading");
        await loadingController.present();
        await this.storeProductService.storeProductSave(serviceName, formDataList[0])
        .subscribe((data: any) => {
          loadingController.dismiss();
          this.storeProductsForm.reset();
          this.selectedDocs = [];
          this.tempProducts=[];
          if (this.selectedWebDocs) {
            this.selectedWebDocs.nativeElement.value = "";
          }
          this.showTempList=false;
          this.editProduct = false;
          this.presentToast("Product saved Successfully","success");
          this.storeProductsList();
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
        } else if (key == 'Files') {
          for (var j = 0; j < tempProducts[i][key].length; j++) {
            productFormData.append("files", tempProducts[i][key][j], 'ProductImage' + j + '.jpg');
          }
        } else {
          productFormData.append(key, tempProducts[i][key]);
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
  editProductInfo(rowdata:any){

    this.editProduct = true  ;
    this.uploadedDocuments= [];
    if(rowdata===null){
        this.productId=0;
    }else{
      this.productId=rowdata.id;
      this.setForamADetailsToPage(rowdata);
      this.getUploadDocuments(this.productId);
    }
  }

  private getUploadDocuments(storeProductsID:number) {
   const objData={Id: Number(storeProductsID) ,searchKey:'StoreUpload'}
         this.storeProductService.getUploadDocuments("UploadedDocuments", objData)
        .subscribe((data: any) => {
           this.uploadedDocuments=data;
        },
          (error: any) => {

          });
  }
  private setForamADetailsToPage(data: any): void {
    this.storeProductsForm.patchValue({
      StoreID:String(data.storeID),
      Category:data.category,
      ProductName: data.productName,
      Units: data.units,
      Quantity: data.quantity,
      DiscountType: data.discountType,
      Discount: data.discount,
      PriceBeforeDiscount: data.priceBeforeDiscount ,
      PriceAfterDiscount: data.priceAfterDiscount,
      AvailableQty: data.availableQty   ,
      Description: data.description
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
    this.editProduct = false;
    this.storeProductsForm.reset();
    this.selectedDocs = [];
    // this.selectedWebDocs.nativeElement.value = "";
  }
  private createStoreForm(){
    this.storeForm = new FormGroup({
      SearchStoreId: new FormControl('0'),
    
    });
  }
  changeStore(){
    this.storeProductsList();
  }



  async presentAlertConfirm(rowdata:any,type:string) {
      const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Do you want to delete ?',
      message:rowdata.productName,
      buttons: [
       {
          text: 'Confirm',
          handler: () => {
            if(type==='document'){
              this.deleteDocument(rowdata);
            }else{
           this.deleteStoreProduct(rowdata.id);
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
  async deleteStoreProduct(storeProductId:number){
    const loadingController = await this.helperService.createLoadingController("loading");
      await loadingController.present();
      const dataObject={StoreProductId: storeProductId};
      await this.storeProductService.deleteStoreProduct('storeProductDelete', dataObject)
      .subscribe((data: any) => {
        this.storeProductsList();
        loadingController.dismiss();
      },
        (error: any) => {
          loadingController.dismiss();
        });
  }


  async deleteDocument(rowdata:any){
    const loadingController = await this.helperService.createLoadingController("loading");

      await loadingController.present();
      const dataObject={searchKey:'StoreUpload',ProductId: rowdata.storeProductsID,DocumentId:rowdata.id,filePath:rowdata.logo};
      await this.storeProductService.deleteDocument('DeleteDocument', dataObject)
      .subscribe((data: any) => {
        this.uploadedDocuments= [];
        loadingController.dismiss();
        this.getUploadDocuments(Number(rowdata.storeProductsID));
      },
        (error: any) => {
          loadingController.dismiss();
        });
  }



  async updateProductStatus(rowdata:any){

       const dataObject={ProductId:rowdata.id,Status: rowdata.isActive===true?false:true,};
      await this.storeProductService.updateProductStatus('updateStoreProductStatus', dataObject)
      .subscribe((data: any) => {
        this.storeProductsList();
      },
        (error: any) => {

        });
  }
  showImage(imgUrl){
    this.helperService.showImage(imgUrl);
   }

}
