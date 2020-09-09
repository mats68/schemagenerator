import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtFormComponent } from './mt-form.component';

describe('MtFormComponent', () => {
  let component: MtFormComponent;
  let fixture: ComponentFixture<MtFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
