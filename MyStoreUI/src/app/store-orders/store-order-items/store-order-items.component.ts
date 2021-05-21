import { Component, AfterViewInit, Input, ViewChild,  ElementRef, Renderer2, OnInit } from "@angular/core";
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-store-order-items',
  templateUrl: './store-order-items.component.html',
  styleUrls: ['./store-order-items.component.scss'],
})
export class StoreOrderItemsComponent implements  OnInit  {

  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expandHeight") expandHeight: string = "250px";
  // @Input() items: any = [];
  @Input("expanded") expanded: boolean;
  @Input()  orderedItems:any = [];

  constructor(public renderer: Renderer2,  private toastController:ToastController) {
    // this.orderedItems = [
    //   { name: 'Santoor', price: 30, count: 1, thumb: 'merchantProduct-1.jpeg',units: 'item'},
    //   { name: 'Lays', price: 50, count: 5, thumb: 'merchantProduct-2.jpeg',units: 'item' },
    //   { name: 'Biscuits', price: 50, count: 10, thumb: 'merchantProduct-3.jpeg',units: 'item' },
    //   { name: 'Ground Nuts', price: 100, count: 1, thumb: 'merchantProduct-4.jpeg',units: 'Kg' },
    //   { name: 'Oil', price: 150, count: 1, thumb: 'merchantProduct-5.jpeg',units: 'Ltrs' }
    // ];
  }

  ngOnInit() { 
    console.log(this.orderedItems);
  }

  ngOnChanges(SimpleValues:any) {
   this.expanded = SimpleValues.expanded.currentValue;
  }  
}

