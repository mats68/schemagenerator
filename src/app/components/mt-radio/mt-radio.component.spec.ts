import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtRadioComponent } from './mt-radio.component';

describe('MtRadioComponent', () => {
  let component: MtRadioComponent;
  let fixture: ComponentFixture<MtRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
