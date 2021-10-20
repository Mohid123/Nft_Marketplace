import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllNftsByClub } from '../models/requests/get-all-afts-by-club.model';
import { ResponseGroupsByClub } from '../models/response-groups-by-club.model';
import { environment } from './../../../environments/environment';
import { ApiResponse } from './../models/response.model';
import { ApiService } from './api.service';

type groupApiData = ResponseGroupsByClub;

@Injectable({
  providedIn: 'root'
})
export class GroupService extends ApiService<groupApiData> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  getAllGroupsByClub(clubName: string, page: number, limit?: number): Observable<ApiResponse<groupApiData>> {
    const param: GetAllNftsByClub = {
      clubName: clubName,
      offset: page ? environment.limit * page : 0,
      limit: limit || environment.limit,
    };
    return this.get('/group/getAllGroupsByAppPackageId',param);
  }

}
