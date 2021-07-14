import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
  OnInit,
} from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-service-order-items',
  templateUrl: './service-order-items.component.html',
  styleUrls: ['./service-order-items.component.scss'],
})
export class ServiceOrderItemsComponent implements OnInit {
  @ViewChild('expandWrapper', { read: ElementRef }) expandWrapper: ElementRef;
  @Input('expandHeight') expandHeight: string = '250px';
  @Input() items: any;
  @Input('expanded') expanded: boolean;
  @Input('orderDetails') orderDetails: any;
  @Input() condition:any;

  constructor(
    public renderer: Renderer2,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  ngOnChanges(SimpleValues: any) {
    this.expanded = SimpleValues.expanded.currentValue;
    this.items = SimpleValues.items.currentValue;
  }
}
