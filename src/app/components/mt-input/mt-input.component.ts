import { Component, OnInit, Input } from '@angular/core';

import { SchemaService } from '../../schema.service';


@Component({
  selector: 'mt-input',
  templateUrl: './mt-input.component.html',
  styleUrls: ['./mt-input.component.scss']
})
export class MtInputComponent implements OnInit {
  @Input() comp: any;

  constructor(private schemaService: SchemaService) {

  }

  ngOnInit(): void {
  }

  getLabel(): string {
    return this.schemaService.getLabel(this.comp);
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
  }

  onBlur(): void {
    this.schemaService.validate(this.comp);
  }



}
