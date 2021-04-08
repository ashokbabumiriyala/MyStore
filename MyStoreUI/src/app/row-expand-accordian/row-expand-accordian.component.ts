import { Component, AfterViewInit, Input, ViewChild,  ElementRef, Renderer2 } from "@angular/core";

@Component({
  selector: 'app-row-expand-accordian',
  templateUrl: './row-expand-accordian.component.html',
  styleUrls: ['./row-expand-accordian.component.scss'],
})
export class RowExpandAccordianComponent implements AfterViewInit {
  public items: any = [];
  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expanded") expanded: boolean;
  @Input("expandHeight") expandHeight: string = "120px";

  constructor(public renderer: Renderer2) {
    this.items = [
      {store:'Store-1', status:'Deactive'},
      {store:'Store-2', status:'Deactive'},
      {store:'Store-3', status:'Deactive'},
      {store:'Store-4', status:'Active'},
      {store:'Store-5', status:'Active'}
    ];
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, "height", this.expandHeight);
  }
  ngOnChanges(SimpleValues:any) {
   this.expanded = SimpleValues.expanded.currentValue;
  }
}