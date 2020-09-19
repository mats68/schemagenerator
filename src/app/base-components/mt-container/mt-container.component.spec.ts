import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtContainerComponent } from './mt-container.component';

describe('MtContainerComponent', () => {
  let component: MtContainerComponent;
  let fixture: ComponentFixture<MtContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
