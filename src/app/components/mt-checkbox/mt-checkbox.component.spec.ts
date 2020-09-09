import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtCheckboxComponent } from './mt-checkbox.component';

describe('MtCheckboxComponent', () => {
  let component: MtCheckboxComponent;
  let fixture: ComponentFixture<MtCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
