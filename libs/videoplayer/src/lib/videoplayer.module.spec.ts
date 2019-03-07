import { async, TestBed } from '@angular/core/testing'
import { VideoplayerModule } from './videoplayer.module'

describe('VideoplayerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VideoplayerModule],
    }).compileComponents()
  }))

  it('should create', () => {
    expect(VideoplayerModule).toBeDefined()
  })
})
