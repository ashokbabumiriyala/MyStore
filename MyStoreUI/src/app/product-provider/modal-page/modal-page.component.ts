import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StoreProductService } from '../store-products/store-product.service'
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {

  @Input() productId: number;
  @Input() quantity: number; 
  
  
  constructor(private modalController:ModalController,private storeProductService:StoreProductService) { }
  stockFormGroup:FormGroup;
  isFormSubmitted:boolean;
  ngOnInit() {
    console.log(this.quantity);
    this.createStockForm();
   // this.setForamADetailsToPage();
  }
  private createStockForm(){
    this.stockFormGroup = new FormGroup({
      currentQuantity: new FormControl('', Validators.required),
    });
  }

  get currentQuantity(){
    return this.stockFormGroup.get('currentQuantity');
  }

  // private setForamADetailsToPage(): void { 
  //   this.stockFormGroup.patchValue({
  //     currentQuantity:Number(this.quantity)
  // }); 
  // }
  async updateStockQuantity():Promise<void> {
    // this.isFormSubmitted=true;
    // if (this.stockFormGroup.invalid) {
    //   return;
    // }else{   
      this.isFormSubmitted=false;     
      const dataObj={ProductId:this.productId,Status:true,AvlQuantity:  Number(this.currentQuantity.value)} 
        await this.storeProductService.updateInventory("updateInventoryQuantity", dataObj)
        .subscribe((data: any) => {
        this.dismiss();
        },
          (error: any) => {           
        });
    // }
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
