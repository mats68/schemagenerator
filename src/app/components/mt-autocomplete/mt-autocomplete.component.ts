import { Component, OnInit, Input } from '@angular/core';
import { SchemaService } from '../../schema.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'mt-autocomplete',
  templateUrl: './mt-autocomplete.component.html',
  styleUrls: ['./mt-autocomplete.component.scss']
})
export class MtAutocompleteComponent implements OnInit {
  myControl = new FormControl('');
  @Input() comp: any;
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(private schemaService: SchemaService) { }

  ngOnInit() {
    this.options = this.comp.options || [];
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getValue(): string {
    return this.schemaService.getValueString(this.comp.field);
  }

  getStyle(): string {
    const width = this.comp.width ? `width: ${this.comp.width};` : 'width: 100%';
    return `margin: 10px;${width}`;
  }

  onChange(text: string): void {
    this.schemaService.updateValue(this.comp, text);
    if (this.options.indexOf(text) === -1) {
      this.options.push(text);
    }
  }

  onBlur(): void {
    this.schemaService.validate(this.comp);
  }

}
