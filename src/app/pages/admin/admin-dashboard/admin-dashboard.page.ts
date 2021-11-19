import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CreatorService } from '@app/@core/services/creator.service';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { GroupService } from '@app/@core/services/group.service';
import { NFTService } from '@app/@core/services/nft.service';
import { RouteService } from '@app/@core/services/route.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { NFTList } from './../../../@core/models/NFTList.model';
import { ApiResponse } from './../../../@core/models/response.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements AfterViewInit {

  destroy$ = new Subject();

  @ViewChild('myCanvas')
  canvas!: ElementRef;

  public creatorStats$ = this.creatorService.CreatorStats$;
  public groups$ = this.groupService.groups$;

  private _isLoading:boolean;
  public nftList: NFTList;
  public clubName: string;
  public nftLimit = 10 ;
  public page:number;

  public lineChartData: ChartDataSets[] = [
    {
      data: [
      ],
      fill: false,
      borderWidth: 7,
    },
  ];

  months = [
    {
      name: 'January',
    },
    {
      name: 'February',
    },
    {
      name: 'March',
    },
    {
      name: 'April',
    },
    {
      name: 'May',
    },
    {
      name: 'June',
    },
    {
      name: 'July',
    },
    {
      name: 'August',
    },
    {
      name: 'September',
    },
    {
      name: 'October',
    },
    {
      name: 'November',
    },
    {
      name: 'December',
    },

  ]
  public lineChartLabels: Label[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
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

  constructor(
    private authService:AuthService,
    private customDialogService:CustomDialogService,
    private creatorService: CreatorService,
    private groupService: GroupService,
    private nftService: NFTService,
    private routeService: RouteService,
  ){
    this.page = 1;
    this._isLoading = false;
    this.routeService.clubName$.pipe(takeUntil(this.destroy$)).subscribe((clubName) => {
      this.clubName = clubName;
      if(this.clubName) {
        this.nftService.getRecentSoldNfts(this.clubName,this.page, this.nftLimit)
        .pipe(take(1))
        .subscribe((result:ApiResponse<NFTList>) => {
          if (!result.hasErrors()) {
            this.nftList = result.data;
          }
          this._isLoading = false;
        });
      }
    });

    this.creatorStats$.subscribe(status=> {
      status.monthlyStats.forEach(stats => {
        this.lineChartData[0].data.push(stats.profit);
      })
    })
  }

  ngAfterViewInit(): void {
    const param = {
      limit: 4
    }
    this.creatorService.getCreatorStats(this.routeService.clubName).pipe(takeUntil(this.destroy$)).subscribe();
    this.groupService.getAllGroupsByClub(this.clubName, 1, param);
    // console.log('aksdjkasjd');
    const gradient = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(100, 0, 220, 600);
    gradient.addColorStop(0, '#0040ff');
    gradient.addColorStop(0.2, '#bf00ff');
    gradient.addColorStop(0.5, '#ffff35');
    // console.log('gradient:',gradient);
    this.lineChartColors[0].backgroundColor = gradient;
    this.lineChartColors[0].borderColor = gradient;

  }
}
