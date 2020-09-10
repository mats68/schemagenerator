import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtDividerComponent } from './mt-divider.component';

describe('MtDividerComponent', () => {
  let component: MtDividerComponent;
  let fixture: ComponentFixture<MtDividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtDividerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
