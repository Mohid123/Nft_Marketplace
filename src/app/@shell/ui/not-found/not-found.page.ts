import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RouteService } from '@app/@core/services/route.service';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { ThemeService } from '@core/services/theme';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Club } from './../../../@core/models/club.model';
import { GetAllClubs } from './../../../@core/models/requests/get-all-club.model';
import { ClubService } from './../../../@core/services/club.service';
SwiperCore.use([Pagination, Autoplay ]);





@Component({
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotFoundPage implements OnInit {
  @ViewChild('menu') menu!: ElementRef
  @ViewChild('content') content!: ElementRef
  demoCLub = environment.demoClub;
  demoCLub1 = environment.demoClub1;
  testNet = environment.testNet;
  destroy$ = new Subject();
  path = ROUTER_UTILS.config.base;
  clubRouteUrl = ROUTER_UTILS;
  public clubName: string;

  public allClub = false;
  public slider = true;
  public filterName: string;
  public sortBy: string;

  isLinear = false;
  registrationForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  adminRouteUrl = ROUTER_UTILS.config.base.register;

  public file: any;
  public urls: any[] = [];
  public imageSrc: any[] = [];

  public profileImage: any;
  public profileImg = new FormData();
  public profileImageSrc: any;
  name = [
    {
      sortBy: 'A - Z'
    },
    {
      sortBy: 'Z - A'
    }
  ]

  public clubs: Club[];

  searchControl = new FormControl();

  constructor(
    private ClubService: ClubService,
    private themeService: ThemeService,
    private routeService: RouteService,
    private _formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.searchControl.valueChanges.pipe(debounceTime(1000))
      .subscribe(newValue => {
        this.getClubs();
      });

      // debugger
      const params: GetAllClubs = {
        offset: 0,
        sortDisplayName: this.sortBy,
        limit: 100
      }

      if(this.searchControl.value) {
        params.displayName = this.searchControl.value;
      }

      this.ClubService.getAllClubs(params).subscribe(res=> {
        if(!res.hasErrors() && res.data.totalCount > 0) {
          this.clubs = res.data.data;
          console.log(this.clubs)

        }
      })


  }



  ngOnInit(){



    this.getClubs();

    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

  }

  onSelectProfile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.profileImage = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // this.cropProfileImg(event);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  onSelectFile(event:any) {

    this.file = event.target.files && event.target.files.length;
    if (this.file == 1) {
      for (const singlefile of event.target.files) {


       const reader = new FileReader();
        reader.readAsDataURL(singlefile);
        this.secondFormGroup.get('image')?.setValue(this.file.name);
        this.urls.push(singlefile);
        reader.onload = (event) => {
          const url = this.sanitizer.bypassSecurityTrustUrl((<FileReader>event.target).result as string);
          this.imageSrc.push(url);

          if (this.imageSrc.length > 1) {
            this.imageSrc.pop();
            this.urls.pop();

            // this.toastr.error("Only one Image is allowed", "Upload Images");
          }
        };
      }
    } else {
      // this.toastr.error("Please Select One Image to Upload", "Upload Image");
    }

  }


  openNav(){
    this.menu.nativeElement.style.width = "100%";
  }

  closeNav(){
  this.menu.nativeElement.style.width = "0%"
  }

  getClubs(){
    const params: GetAllClubs = {
      offset: 0,
      sortDisplayName: this.sortBy,
    }

    if(this.searchControl.value) {
      params.displayName = this.searchControl.value;
    }

    this.ClubService.getAllClubs(params).subscribe(res=> {
      if(!res.hasErrors() && res.data.totalCount > 0) {
        this.clubs = res.data.data;

      }
    })
  }

  sortClick(sort){
    this.sortBy = sort;
    this.getClubs();
  }

  showAllClub() {
    this.allClub = true;
    this.slider = false;
  }
}

