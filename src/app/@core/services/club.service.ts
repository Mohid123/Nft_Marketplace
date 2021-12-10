import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllClubs } from '../models/all-clubs.model';
import { ApiResponse } from '../models/response.model';
import { ApiService } from './api.service';

type clubsData = AllClubs;

@Injectable({
  providedIn: 'root'
})
export class ClubService  extends ApiService<clubsData>  {

  constructor(protected http: HttpClient) {
    super(http);
  }

  getAllClubs(): Observable<ApiResponse<clubsData>> {
    return this.get('/creator/getClubsbyCreator')
  }


}
