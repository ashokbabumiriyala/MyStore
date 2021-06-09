import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {
  @Input() productId: number;
  @Input() quantity: number;
  constructor(private modalController:ModalController) { }
  stockFormGroup:FormGroup;
  isFormSubmitted:boolean;
  ngOnInit() {
    console.log(this.quantity);
    console.log(this.productId);
    this.createStockForm();
    this.setForamADetailsToPage();
  }

  private createStockForm(){
    this.stockFormGroup = new FormGroup({
      avaQuantity: new FormControl('', Validators.required),
    });
  }

  get avaQuantity(){
    return this.stockFormGroup.get('avaQuantity');
  }

  private setForamADetailsToPage(): void {
    this.stockFormGroup.patchValue({
      avaQuantity:Number(this.quantity)
  });
  } 

  async updateStockQuantity():Promise<void> {  
  
    this.isFormSubmitted=true;
    if (this.stockFormGroup.invalid) {
      return;
    }else{     
     
      this.isFormSubmitted=false;      
        // await this.storeProductService.storeProductSave(serviceName, formDataList[0])
        // .subscribe((data: any) => {
        //   loadingController.dismiss();
        //   this.storeProductsForm.reset();
        //   this.selectedDocs = [];
        //   this.tempProducts=[];
        //   if (this.selectedWebDocs) {
        //     this.selectedWebDocs.nativeElement.value = "";
        //   }
        //   this.showTempList=false;
        //   this.editProduct = false;
        //   this.presentToast("Product saved Successfully","success");
        //   this.storeProductsList();
        // },
        //   (error: any) => {
        //     loadingController.dismiss();
        //   });
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
