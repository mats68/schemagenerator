import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtTabsComponent } from './mt-tabs.component';

describe('MtTabsComponent', () => {
  let component: MtTabsComponent;
  let fixture: ComponentFixture<MtTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
