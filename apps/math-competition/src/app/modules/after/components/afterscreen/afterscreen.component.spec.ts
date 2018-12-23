import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AfterscreenComponent } from "./afterscreen.component";

describe('AfterscreenComponent', () => {
  let component: AfterscreenComponent;
  let fixture: ComponentFixture<AfterscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AfterscreenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
