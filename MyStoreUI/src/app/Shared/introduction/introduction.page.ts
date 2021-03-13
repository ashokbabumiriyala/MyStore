import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.page.html',
  styleUrls: ['./introduction.page.scss'],
})
export class IntroductionPage implements OnInit {
imgSlide:boolean = true;
introduction:boolean = false;
videoSlide:boolean = false;

  constructor(private route:Router) { }

  ngOnInit() {
  }
  nextSlide() {
    this.imgSlide = false;
    this.introduction = true;
    this.videoSlide = false;
  }
  endSlide() {
    this.route.navigate(['/login']);
    // this.imgSlide = false;
    // this.introduction = false;
    // this.videoSlide = true;
  }
  navigateToLogin() {
    this.route.navigate(['/login']);
  }

}
