import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-product-provider',
  templateUrl: './admin-product-provider.page.html',
  styleUrls: ['./admin-product-provider.page.scss'],
})
export class AdminProductProviderPage implements OnInit {
  public items: any = [];
  public masterData:any = [];
  public searchMaster: string = "";
  public asc:boolean = true;

  constructor() {
    this.items = [
      {master:'A', expanded: false },
      {master:'B', expanded: false },
      {master:'C', expanded: false },
      {master:'D', expanded: false },
      {master:'E', expanded: false }
    ];
    Object.assign(this.masterData,this.items);
  }
  ngOnInit() {
  }
  sorting() {
    this.asc = !this.asc;
  }
  filterItems() {
    this.masterData = this.items.filter(item => {
      return item.master.toLowerCase().indexOf(this.searchMaster.toLowerCase()) > -1;
    });
  }
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
}