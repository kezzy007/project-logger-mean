import { TestBed, inject } from '@angular/core/testing';

import { UserAvatarService } from './user-avatar.service';

describe('UserAvatarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAvatarService]
    });
  });

  it('should be created', inject([UserAvatarService], (service: UserAvatarService) => {
    expect(service).toBeTruthy();
  }));
});
