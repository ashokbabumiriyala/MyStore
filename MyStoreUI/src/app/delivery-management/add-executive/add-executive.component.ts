import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-executive',
  templateUrl: './add-executive.component.html',
  styleUrls: ['./add-executive.component.scss'],
})
export class AddExecutiveComponent implements OnInit {
  editExecutive: boolean = false;
  constructor() { }

  ngOnInit() {}
  addExecutive() {
    console.log("Form Submitted !!")
  }
  ionViewDidLeave() {
    this.editExecutive = false;
  }
  add() {
    this.editExecutive = true;
  }
}
