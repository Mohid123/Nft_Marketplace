import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss']
})
export class AdminDashboardPage {

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: null
  };
  public lineChartColors: Color[] = [
    {
      borderColor: ["#80b6f4", "#94d973", "#fad874", "#f49080"],
      backgroundColor:['red','green', 'blue'],//color of dots
      borderWidth: 2, // dot size
      // borderCapStyle: string,
      // borderDash: number[],
      // borderDashOffset: number,
      // borderJoinStyle: string,
      // pointBorderColor: string | string[],
      // pointBackgroundColor: string | string[],
      // pointBorderWidth: number | number[],
      // pointRadius: number | number[],
      // pointHitRadius: number | number[],
      // pointStyle: string | string[],
    },
  ];
  public lineChartLegend = true;
  public lineChartType:ChartType  = 'line';
  public lineChartPlugins = [];

}
