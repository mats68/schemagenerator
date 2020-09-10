import { Component, OnInit, Input } from '@angular/core';

import {SchemaService} from '../../schema.service';


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

  getValue(): string {
    return this.schemaService.getValueString(this.comp.field);
  } 

  onChange(text: string): void {
    this.schemaService.updateValue(this.comp, text);
  } 

  onBlur(): void {
    
  } 

  getErrorMessage(): string {
    if (this.comp.required) {
      return 'required';
    }

  }

}
