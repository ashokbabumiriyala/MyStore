import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-locations',
  templateUrl: './service-locations.page.html',
  styleUrls: ['./service-locations.page.scss'],
})
export class ServiceLocationsPage implements OnInit {
editService:boolean = false;
editMaster:boolean;
  constructor() {}
  fromDate = "2021-03-10T09:30";
  toDate = "2021-03-10T21:30";
  ngOnInit() {
  }
editServiceInfo(){
	this.editService = true;
}
}
