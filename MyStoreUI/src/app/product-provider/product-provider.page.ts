import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-product-provider',
  templateUrl: './product-provider.page.html',
  styleUrls: ['./product-provider.page.scss'],
})
export class ProductProviderPage implements OnInit {

  lineChart: any;
  constructor() { }
  
  @ViewChild('lineCanvas', {static: true}) lineCanvas;

  ngOnInit() {
    this.yourCustomFunctionName();
  }
  public yourCustomFunctionName() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Order details for season',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'darkorange',
                    borderColor: 'darkorange',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'darkorange',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'darkorange',
                    pointHoverBorderColor: 'darkorange',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40],
                    spanGaps: false,
                }
            ]
        }
    });
}

}
