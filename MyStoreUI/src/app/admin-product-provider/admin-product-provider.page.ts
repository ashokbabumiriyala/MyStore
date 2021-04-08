import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-product-provider',
  templateUrl: './admin-product-provider.page.html',
  styleUrls: ['./admin-product-provider.page.scss'],
})
export class AdminProductProviderPage implements OnInit {
  public items: any = [];
  public masterData:any = [];
  public searchTerm: string = "";
  public asc:boolean = true;

  constructor() {
    this.items = [
      {master:'A', expanded: true },
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
     this.items.sort(function (a, b) {
      if(a.master < b.master) {
        return 1;
    } else {
        return -1; 
    }
      return 0;
    });
    console.log(this.items);
  }
  filterItems() {
    this.masterData = this.items.filter(item => {
      return item.master.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
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