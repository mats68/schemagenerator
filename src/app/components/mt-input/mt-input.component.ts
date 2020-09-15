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
    return this.srv.getValue(this.comp);
  }

  onChange(text: string): void {
    this.srv.updateValue(this.comp, text);
  }

  onBlur(): void {
    this.srv.validate(this.comp);
  }



}
