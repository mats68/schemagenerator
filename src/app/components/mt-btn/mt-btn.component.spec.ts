import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtBtnComponent } from './mt-btn.component';

describe('MtBtnComponent', () => {
  let component: MtBtnComponent;
  let fixture: ComponentFixture<MtBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
