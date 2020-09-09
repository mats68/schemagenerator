import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtExpComponent } from './mt-exp.component';

describe('MtExpComponent', () => {
  let component: MtExpComponent;
  let fixture: ComponentFixture<MtExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
