import { TestBed } from '@angular/core/testing';

import { MediaUploadService } from './media-upload.service';

describe('MediaUploadService', () => {
  let service: MediaUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
