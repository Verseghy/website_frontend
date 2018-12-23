import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RegisterteamComponent } from "./registerteam.component";

describe('RegisterteamComponent', () => {
  let component: RegisterteamComponent;
  let fixture: ComponentFixture<RegisterteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
