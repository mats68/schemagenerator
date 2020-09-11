import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtCardgridComponent } from './mt-cardgrid.component';

describe('MtCardgridComponent', () => {
  let component: MtCardgridComponent;
  let fixture: ComponentFixture<MtCardgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtCardgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtCardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
