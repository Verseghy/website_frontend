import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CompetitionscreenComponent } from "./competitionscreen.component";

describe('CompetitionscreenComponent', () => {
  let component: CompetitionscreenComponent;
  let fixture: ComponentFixture<CompetitionscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
