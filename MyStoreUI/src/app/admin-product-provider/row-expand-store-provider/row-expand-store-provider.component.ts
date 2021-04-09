import { Component, AfterViewInit, Input, ViewChild,  ElementRef, Renderer2 } from "@angular/core";

@Component({
  selector: 'app-row-expand-store-provider',
  templateUrl: './row-expand-store-provider.component.html',
  styleUrls: ['./row-expand-store-provider.component.scss'],
})
export class RowExpandStoreProviderComponent implements AfterViewInit {

  public items: any = [];
  public storeData:any = [];
  public searchStore:string= "";
  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expanded") expanded: boolean;
  @Input("expandHeight") expandHeight: string = "250px";

  constructor(public renderer: Renderer2) {
    this.items = [
      {store:'Store-1', status:'Deactive'},
      {store:'Store-2', status:'Deactive'},
      {store:'Store-3', status:'Deactive'},
      {store:'Store-4', status:'Active'},
      {store:'Store-5', status:'Active'}
    ];
    Object.assign(this.storeData,this.items);
  }
  filterItems() {
    this.storeData = this.items.filter(item => {
      return item.store.toLowerCase().indexOf(this.searchStore.toLowerCase()) > -1;
    });
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, "height", this.expandHeight);
  }
  ngOnChanges(SimpleValues:any) {
   this.expanded = SimpleValues.expanded.currentValue;
  }
}
