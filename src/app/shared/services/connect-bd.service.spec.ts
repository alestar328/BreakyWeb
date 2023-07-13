import { TestBed } from '@angular/core/testing';

import { ConnectBDService } from './connect-bd.service';

describe('ConnectBDService', () => {
  let service: ConnectBDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectBDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
