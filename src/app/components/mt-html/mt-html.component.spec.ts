import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtHtmlComponent } from './mt-html.component';

describe('MtHtmlComponent', () => {
  let component: MtHtmlComponent;
  let fixture: ComponentFixture<MtHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
