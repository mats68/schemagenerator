import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtAutocompleteComponent } from './mt-autocomplete.component';

describe('MtAutocompleteComponent', () => {
  let component: MtAutocompleteComponent;
  let fixture: ComponentFixture<MtAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
