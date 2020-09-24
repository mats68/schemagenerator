import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtErrorpanelComponent } from './mt-errorpanel.component';

describe('MtErrorpanelComponent', () => {
  let component: MtErrorpanelComponent;
  let fixture: ComponentFixture<MtErrorpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtErrorpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtErrorpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
