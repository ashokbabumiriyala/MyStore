import { Component, AfterViewInit, Input, ViewChild, ElementRef, Renderer2, OnInit} from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-store-order-items',
  templateUrl: './store-order-items.component.html',
  styleUrls: ['./store-order-items.component.scss'],
})
export class StoreOrderItemsComponent implements OnInit {
  @ViewChild('expandWrapper', { read: ElementRef }) expandWrapper: ElementRef;
  @Input('expandHeight') expandHeight: string = '250px';
  @Input('expanded') expanded: boolean;
  @Input('orderDetails') orderDetails: any;
  @Input() orderedItems: any;
  @Input() condition:any;

  constructor(
    public renderer: Renderer2,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    console.log(this.orderedItems);
    console.log(this.condition);
  }

  ngOnChanges(SimpleValues: any) {
    this.expanded = SimpleValues.expanded.currentValue;
    this.orderedItems = SimpleValues.orderedItems.currentValue;
  }
}
