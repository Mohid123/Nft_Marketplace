import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements AfterViewInit {
  @ViewChild('myCanvas')
  canvas!: ElementRef;

  public lineChartData: ChartDataSets[] = [
    {
      data: [
        50,45,65, 48, 62, 70, 75,81
      ],
      fill: false,
      borderWidth: 7,
    },
  ];
  public lineChartLabels: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false, //this will remove only the label
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    responsive: true,
    annotation: null,
  };

  public lineChartColors: Color[] = [
    {
      backgroundColor: 'transparent',
    },
  ];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  ngAfterViewInit() {
    console.log('aksdjkasjd');
    const gradient = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(100, 0, 220, 600);
    gradient.addColorStop(0, '#0040ff');
    gradient.addColorStop(0.2, '#bf00ff');
    gradient.addColorStop(0.5, '#ffff35');
    console.log('gradient:',gradient);
    this.lineChartColors[0].backgroundColor = gradient;
    this.lineChartColors[0].borderColor = gradient;
  }
}
