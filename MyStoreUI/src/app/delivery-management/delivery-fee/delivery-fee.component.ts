import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import {HelperService}  from '../../common/helper.service';
import { DeliveryManagmentService}   from '../../delivery-management/delivery-managment.service';
class Port {
  public id: number;
  public name: string;
  public edit: boolean;
}

@Component({
  selector: 'app-delivery-fee',
  templateUrl: './delivery-fee.component.html',
  styleUrls: ['./delivery-fee.component.scss'],
})
export class DeliveryFeeComponent implements OnInit {
  editPrice: boolean = false;
  editGroupPrice: boolean = false;
  selectedStores: any = [];
  basePriceFormGroup:FormGroup;
  isFormSubmitted:boolean;
  storeMasters:any;
  basePriceAmount:number;
  constructor(private deliveryManagmentService:DeliveryManagmentService,
    private helperService:HelperService) { }

  ngOnInit() {
    this.createbasePriceForm();
    this.basePriceSelect();

  }

  get basePrice(){
    return this.basePriceFormGroup.get('basePrice');
  }
  private createbasePriceForm() {
    this.basePriceFormGroup = new FormGroup({
      basePrice: new FormControl('', Validators.required),

    });
  }
  portChange(event: {
  
    component: IonicSelectableComponent,
    value: any
  }) {
    this.selectedStores = event.value;
    console.log('port:', event.value);
  }
  editFee() {
    this.editPrice = true;
  }
  editGroupFee() {
    this.editGroupPrice = true;
  }
  saveGroupFee() {
    this.editGroupPrice = false
  }



  async basePriceSelect() {
      const loadingController = await this.helperService.createLoadingController("loading");
      await loadingController.present();

      await this.deliveryManagmentService.baseFeeSelect("MasterDeliveryFeeSelect")
      .subscribe((data: any) => {
        console.log(data);
        this.storeMasters=data.storeMasters;
       this.setbasePriceToPage(data.basePrice[0].price)
        loadingController.dismiss();
      },
        (error: any) => {
          loadingController.dismiss();
        });
  }

  private setbasePriceToPage(price: number): void {
    this.basePriceAmount = price;
    this.basePriceFormGroup.patchValue({
      basePrice:price
  });
  }


  async basePriceSave() {
    this.isFormSubmitted=true;
    if (this.basePriceFormGroup.invalid) {
      return;
    }
    else{
      // const loadingController = await this.helperService.createLoadingController("loading");
      // await loadingController.present();
      const dataObject={Price:Number(this.basePrice.value)};
      await this.deliveryManagmentService.baseFeeSave("MasterDeliveryFeeInsert",dataObject)
      .subscribe((data: any) => {
         this.helperService.presentToast("Base price added successfuly.","success");
         this.basePriceSelect();
         this.editPrice = false;
        // loadingController.dismiss();
      },
        (error: any) => {
         // loadingController.dismiss();
        });

    }

  }
  storeFeeEdit(store) {
    store.edit = true;
  }
  storeFeeSave(store) {
    store.edit = false;
  }
  storeFeeDelete(store) {
    console.log(store);
  }
}
