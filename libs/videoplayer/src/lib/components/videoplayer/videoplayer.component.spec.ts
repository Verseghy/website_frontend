import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoplayerComponent } from './videoplayer.component';

describe('VideoplayerComponent', () => {
  let component: VideoplayerComponent;
  let fixture: ComponentFixture<VideoplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
