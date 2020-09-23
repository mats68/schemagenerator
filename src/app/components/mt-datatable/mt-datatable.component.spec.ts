import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtDatatableComponent } from './mt-datatable.component';

describe('MtDatatableComponent', () => {
  let component: MtDatatableComponent;
  let fixture: ComponentFixture<MtDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
