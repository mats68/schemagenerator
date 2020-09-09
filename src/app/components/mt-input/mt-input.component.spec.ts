import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtInputComponent } from './mt-input.component';

describe('MtInputComponent', () => {
  let component: MtInputComponent;
  let fixture: ComponentFixture<MtInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
