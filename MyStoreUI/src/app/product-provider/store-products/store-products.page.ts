import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreProductService } from '../store-products/store-product.service'
import { NavController, ToastController } from '@ionic/angular';
import {HelperService} from '../../common/helper.service';
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
// Product:IProduct[]=[];
constructor(private storeProductService:StoreProductService,
  private   toastController:ToastController,private helperService:HelperService) { }

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
      const dataObject={Id: Number(sessionStorage.getItem("providerId")),Mode:'Select',StoreId:0};
      this.storeProductService.storeProductList('ProviderStoreProductsSelect', dataObject)
      .subscribe((data: any) => {
        this.stores=data.storeDropdown;
        this.storeProductsData =data.storeProducts;
      },
        (error: any) => {         
                     
        });
        await loadingController.dismiss();
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
    const productObject= {slNo:Number(serialNumber), StoreID:1, Category:this.Category.value, 
      ProductName:this.ProductName.value,
      Units:this.Units.value,Quantity:Number(this.Quantity.value),
      DiscountType :this.DiscountType.value, Discount:Number(this.Discount.value),PriceBeforeDiscount:Number(this.PriceBeforeDiscount.value)
       ,PriceAfterDiscount:Number(this.PriceAfterDiscount.value)};
       this.tempProducts.push(productObject);      
       this.showTempList=true;
       this.storeProductsForm.reset();
       this.presentToast("Store " + this.title+ "  successfully.","success");  
  }
}
uploadProduct():void{
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

