import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtLabelComponent } from './mt-label.component';

describe('MtLabelComponent', () => {
  let component: MtLabelComponent;
  let fixture: ComponentFixture<MtLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
