// https://stackoverflow.com/questions/44597807/angular-2-material-using-mds-autocomplete-example-in-a-form
import { Component, OnInit, Input } from '@angular/core';

import { SchemaManager } from '../../base/schemaManager';
import { IComponent, IMaskOptions } from 'src/app/base/types';


@Component({
  selector: 'mt-input',
  templateUrl: './mt-input.component.html',
  styleUrls: ['./mt-input.component.scss']
})
export class MtInputComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  options: string[];
  filteredOptions: string[];
  maskOptions: IMaskOptions;

  constructor() {  }

  ngOnInit(): void {
    this.options = this.comp.options as string[];
    this.filteredOptions = this.options;
    this.maskOptions = this.comp.maskOptions || {};
    if (!this.comp.mask) this.maskOptions = {};
  }

  get Value(): string {
    return this.sm.getValue(this.comp);
  }

  set Value(val: string) {
    this.sm.updateValue(this.comp, val);
  }

  getError() {
    return this.comp.error;
  }

  Filter(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  onBlur(): void {
    this.sm.validate(this.comp);
  }





}
