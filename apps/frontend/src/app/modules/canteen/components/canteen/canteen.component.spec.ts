import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CanteenComponent } from './canteen.component'

describe('CanteenComponent', () => {
  let component: CanteenComponent;
  let fixture: ComponentFixture<CanteenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanteenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
