import { TestBed } from '@angular/core/testing';

import { PopupHandlerService } from './popup-handler.service';

describe('PopupHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopupHandlerService = TestBed.get(PopupHandlerService);
    expect(service).toBeTruthy();
  });
});
