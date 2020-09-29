import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { MtBaseComponent } from 'src/app/base/mt-base/mt-base.component';
import { IMaskOptions } from 'src/app/base/types';

enum InpTyp {
  normal,
  textarea,
  autocomplete,
  select
}

@Component({
  selector: 'mt-input',
  templateUrl: './mt-input.component.html',
  styleUrls: ['./mt-input.component.scss']
})

export class MtInputComponent extends MtBaseComponent implements OnInit, OnDestroy  {
  @Input() isSelect: boolean;

  filteredOptions: string[];
  maskOptions: IMaskOptions;
  Typ: InpTyp;

  ngOnInit(): void {
    this.registerFocus();

    this.Typ = InpTyp.normal;
    if (this.isSelect) {
      this.Typ = InpTyp.select;
    } else if (this.comp.multiline) {
      this.Typ = InpTyp.textarea;
    } else if (this.comp.options) {
      this.Typ = InpTyp.autocomplete;
      this.filteredOptions = this.OptionsAsStrings;
    }

    this.maskOptions = this.comp.maskOptions || {};
    if (!this.comp.mask) this.maskOptions = {};
  }

  Filter(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredOptions = this.OptionsAsStrings.filter(option => option.toLowerCase().includes(filterValue));
  }


  ngOnDestroy() {
    this.unregisterFocus();
  }




}
