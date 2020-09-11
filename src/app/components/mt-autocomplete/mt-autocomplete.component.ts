import { Component, OnInit, Input } from '@angular/core';
import { SchemaService } from '../../schema.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mt-autocomplete',
  templateUrl: './mt-autocomplete.component.html',
  styleUrls: ['./mt-autocomplete.component.scss']
})
export class MtAutocompleteComponent implements OnInit {
  myControl = new FormControl();
  @Input() comp: any;

  constructor(private schemaService: SchemaService) { }

  ngOnInit(): void {
  }


  getValue(): string {
    return this.schemaService.getValueString(this.comp.field);
  }

  getStyle(): string {
    const width = this.comp.width ? `width: ${this.comp.width};` : 'width: 100%';
    return `margin: 10px;${width}`
  }

  onChange(text: string): void {
    this.schemaService.updateValue(this.comp, text);
  }

  onBlur(): void {
    this.schemaService.validate(this.comp);
  }

}
