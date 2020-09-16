import { Component, OnInit, Input } from '@angular/core';

import { SchemaManager } from '../../base-components/schemaManager';
import { IComponent } from 'src/app/base-components/types';


@Component({
  selector: 'mt-input',
  templateUrl: './mt-input.component.html',
  styleUrls: ['./mt-input.component.scss']
})
export class MtInputComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;

  constructor() {

  }

  ngOnInit(): void {
  }

  getValue(): string {
    return this.sm.getValue(this.comp);
  }

  onChange(text: string): void {
    this.sm.updateValue(this.comp, text);
  }

  onBlur(): void {
    this.sm.validate(this.comp);
  }



}
