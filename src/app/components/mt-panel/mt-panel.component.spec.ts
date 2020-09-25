import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtPanelComponent } from './mt-panel.component';

describe('MtPanelComponent', () => {
  let component: MtPanelComponent;
  let fixture: ComponentFixture<MtPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
