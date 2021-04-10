import { Component, AfterViewInit, Input, ViewChild,  ElementRef, Renderer2, OnInit } from "@angular/core";

@Component({
  selector: 'app-row-expand-store-provider',
  templateUrl: './row-expand-store-provider.component.html',
  styleUrls: ['./row-expand-store-provider.component.scss'],
})
export class RowExpandStoreProviderComponent implements OnInit {

  @Input() items: any = [];
  storeData:any = [];
  public searchStore:string= "";
  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expanded") expanded: boolean;

  constructor(public renderer: Renderer2) {
    // this.items = [
    //   {name:'Store-1', status:'Deactive'},
    //   {name:'Store-2', status:'Deactive'},
    //   {name:'Store-3', status:'Deactive'},
    //   {name:'Store-4', status:'Active'},
    //   {name:'Store-5', status:'Active'}
    // ];
    // Object.assign(this.storeData,this.items);
  } 
  // ngAfterViewInit() {
  // }

  ngOnInit() {   
    Object.assign(this.storeData,this.items);
    console.log(this.items);
  }

  ngOnChanges(SimpleValues:any) {
   this.expanded = SimpleValues.expanded.currentValue;
  }
  filterItems() {
    this.storeData = this.items.filter(item => {
      return item.name.toLowerCase().indexOf(this.searchStore.toLowerCase()) > -1;
    });
  }
}
