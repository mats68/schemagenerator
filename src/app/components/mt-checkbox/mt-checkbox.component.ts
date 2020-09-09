import { Component, OnInit, Input } from '@angular/core';
import {SchemaService} from '../../schema.service';

@Component({
  selector: 'mt-checkbox',
  templateUrl: './mt-checkbox.component.html',
  styleUrls: ['./mt-checkbox.component.scss']
})
export class MtCheckboxComponent implements OnInit {
  @Input() comp: any;

  constructor(private schemaService: SchemaService) { }

  ngOnInit(): void {
  }

  getValue(): boolean {
    return this.schemaService.getValueBoolean(this.comp.field);
  } 

  onChange(val: boolean): void {
    this.schemaService.updateValue(this.comp.field, val);
  } 


}
