import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtSwitchComponent } from './mt-switch.component';

describe('MtSwitchComponent', () => {
  let component: MtSwitchComponent;
  let fixture: ComponentFixture<MtSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
