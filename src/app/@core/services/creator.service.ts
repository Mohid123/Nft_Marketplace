import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Creator } from '../models/creator.model';
import { ApiService } from './api.service';

type creatorData = Creator;

@Injectable({
  providedIn: 'root'
})
export class CreatorService extends ApiService<creatorData> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  getCreator(clubName) {
    const param = {
      clubName: clubName,
    }
    return this.get('/creator/searchCreatorByName',param)
  }
}
