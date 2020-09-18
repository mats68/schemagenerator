import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IComponent, ISelectOptionItems } from 'src/app/base-components/types';

@Component({
  selector: 'mt-autocomplete',
  templateUrl: './mt-autocomplete.component.html',
  styleUrls: ['./mt-autocomplete.component.scss']
})
export class MtAutocompleteComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  myControl = new FormControl('');
  options: string[];
  optionsObj: ISelectOptionItems;
  filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.options = this.sm.selectOptionsAsStrings(this.comp);
    this.optionsObj = this.sm.selectOptionsAsObjects(this.comp);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.myControl.setValue(this.sm.getValue(this.comp))
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getValue(): string {
    const val = this.sm.getValue(this.comp);
    const f = this.optionsObj.find(item => item.value == val);
    return f && f.text ? f.text : '';
  }


  onChange(text: string): void {
    const f = this.optionsObj.find(item => item.text == text);
    if (f && f.value) {
      this.sm.updateValue(this.comp, f.value);
    }

    if (this.comp.autoupdate) {
      if (this.options.indexOf(text) === -1) {
        this.options.push(text);
        this.optionsObj.push({value: text, text});
      }

    }
  }

  onBlur(): void {
    this.sm.validate(this.comp);
  }

}
