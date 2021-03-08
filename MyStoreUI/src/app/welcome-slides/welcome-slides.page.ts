import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-welcome-slides',
  templateUrl: './welcome-slides.page.html',
  styleUrls: ['./welcome-slides.page.scss'],
})
export class WelcomeSlidesPage implements OnInit {
  addStoreInformation:boolean = false;
  constructor(private router: Router) { }
  
  ngOnInit() {
    
  }
  nextToSteps() {
    this.addStoreInformation = true;
  }
  nextToAdd() {
      this.router.navigate(['mystore-slides']);  
  }
 
}
