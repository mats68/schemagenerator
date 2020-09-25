import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtLblComponent } from './mt-lbl.component';

describe('MtLblComponent', () => {
  let component: MtLblComponent;
  let fixture: ComponentFixture<MtLblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtLblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtLblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
