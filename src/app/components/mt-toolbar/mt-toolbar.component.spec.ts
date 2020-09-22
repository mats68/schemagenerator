import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtToolbarComponent } from './mt-toolbar.component';

describe('MtToolbarComponent', () => {
  let component: MtToolbarComponent;
  let fixture: ComponentFixture<MtToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
