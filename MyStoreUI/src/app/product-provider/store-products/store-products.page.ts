import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.page.html',
  styleUrls: ['./store-products.page.scss'],
})
export class StoreProductsPage implements OnInit {
editProduct:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  editProductInfo(){
	  this.editProduct = true;
  }

}
