import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IComponent } from 'src/app/base-components/types';

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
  filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.options = this.comp.options || [];
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
    return this.sm.getValue(this.comp);
  }


  onChange(text: string): void {
    this.sm.updateValue(this.comp, text);
    if (this.options.indexOf(text) === -1) {
      this.options.push(text);
    }
  }

  onBlur(): void {
    this.sm.validate(this.comp);
  }

}
