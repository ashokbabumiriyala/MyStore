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
  @Input() items: any = [];
  @Input("expanded") expanded: boolean;
  @Input()  orderedItems:any = [];

  constructor(public renderer: Renderer2,  private toastController:ToastController) {
   
  }

  ngOnInit() {
    console.log(this.orderedItems);
  }

  ngOnChanges(SimpleValues:any) {
   this.expanded = SimpleValues.expanded.currentValue;
  }  
}

