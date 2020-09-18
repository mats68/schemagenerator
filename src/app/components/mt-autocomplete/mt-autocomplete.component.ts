// https://stackoverflow.com/questions/44597807/angular-2-material-using-mds-autocomplete-example-in-a-form
import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';
import { IComponent, ISelectOptionItems } from 'src/app/base-components/types';

@Component({
  selector: 'mt-autocomplete',
  templateUrl: './mt-autocomplete.component.html',
  styleUrls: ['./mt-autocomplete.component.scss']
})
export class MtAutocompleteComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  options: string[];
  optionsObj: ISelectOptionItems;
  filteredOptions: string[];

  constructor() { }

  _Value: string;
  get Value(): string {
    return this._Value;
  }

  set Value(val: string) {
    const f = this.optionsObj.find(item => item.text == val);
    if (f && f.value) {
      this.sm.updateValue(this.comp, f.value);
    } else {
      this.sm.updateValue(this.comp, val);
    }
    this._Value = val;
  }

  ngOnInit() {
    this.options = this.sm.selectOptionsAsStrings(this.comp);
    this.optionsObj = this.sm.selectOptionsAsObjects(this.comp);
    this.filteredOptions = this.options;

    const val = this.sm.getValue(this.comp);
    const f = this.optionsObj.find(item => item.value == val);
    this._Value = f && f.text ? f.text : '';
  }

  getError() {
    return this.comp.error;
  }

  Filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // getValue(): string {
  //   const val = this.sm.getValue(this.comp);
  //   const f = this.optionsObj.find(item => item.value == val);
  //   return f && f.text ? f.text : '';
  // }


  // onChange(text: string): void {
  //   this._filter(text);
  //   const f = this.optionsObj.find(item => item.text == text);

  //   if (f && f.value) {
  //     this.sm.updateValue(this.comp, f.value);
  //   }

  //   if (this.comp.autoupdate) {
  //     if (this.options.indexOf(text) === -1) {
  //       this.options.push(text);
  //       this.optionsObj.push({value: text, text});
  //     }

  //   }
  // }

  onBlur(): void {
    this.sm.validate(this.comp);
  }

}
