import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-store',
  templateUrl: './single-store.page.html',
  styleUrls: ['./single-store.page.scss'],
})
export class SingleStorePage implements OnInit {
editStore:boolean = false;
  constructor() { }
  fromDate = "2021-03-10T09:30";
  toDate = "2021-03-10T21:30";
  ngOnInit() {
  }
editStoreInfo(){
	this.editStore = true;
}
}
