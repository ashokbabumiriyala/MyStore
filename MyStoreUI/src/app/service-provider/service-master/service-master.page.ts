import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-master',
  templateUrl: './service-master.page.html',
  styleUrls: ['./service-master.page.scss'],
})
export class ServiceMasterPage implements OnInit {
editMaster:boolean = false;

  constructor() { }

  ngOnInit() {
  }
editMasterInfo() {
	this.editMaster = true;
}
}
