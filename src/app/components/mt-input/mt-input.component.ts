import { Component, OnInit, Input } from '@angular/core';

import { SchemaService } from '../../schema.service';


@Component({
  selector: 'mt-input',
  templateUrl: './mt-input.component.html',
  styleUrls: ['./mt-input.component.scss']
})
export class MtInputComponent implements OnInit {
  @Input() comp: any;

  constructor(public srv: SchemaService) {

  }

  ngOnInit(): void {
  }

  getValue(): string {
    return this.srv.getValueString(this.comp.field);
  }

  getStyle(): string {
    const width = this.comp.width ? `width: ${this.comp.width};` : 'width: 100%';
    return `margin: 10px;${width}`;
  }

  onChange(text: string): void {
    this.srv.updateValue(this.comp, text);
  }

  onBlur(): void {
    this.srv.validate(this.comp);
  }



}
