import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtLinkComponent } from './mt-link.component';

describe('MtLinkComponent', () => {
  let component: MtLinkComponent;
  let fixture: ComponentFixture<MtLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
