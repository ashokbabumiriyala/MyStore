import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from "chart.js";
@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.page.html',
  styleUrls: ['./service-provider.page.scss'],
})
export class ServiceProviderPage implements OnInit {

  constructor() { } 
  doughnutChart: any;
  @ViewChild('doughnutCanvas', {static: true}) doughnutCanvas;
  ngOnInit() {
    this.yourCustomFunctionName();
  }

  public yourCustomFunctionName() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: "doughnut",
      data: {
        labels: ["January", "Feb", "March"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19,  30],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",             
              "rgb(153, 153, 255)",              
              "darkorange"
            ],
            hoverBackgroundColor: ["#FF6384", "#FFCE56", "#FF6384"]
          }
        ]
      }
    });
}

}
