import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-service-provider',
  templateUrl: './admin-service-provider.page.html',
  styleUrls: ['./admin-service-provider.page.scss'],
})
export class AdminServiceProviderPage implements OnInit {
  public items: any = [];
  public masterData:any = [];
  public searchMaster: string = "";

  constructor() {
    this.items = [
      {master:'Master-1', expanded: true },
      {master:'Master-2', expanded: false },
      {master:'Master-3', expanded: false },
      {master:'Master-4', expanded: false },
      {master:'Master-5', expanded: false }
    ];
    Object.assign(this.masterData,this.items);
  }
  ngOnInit() {
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