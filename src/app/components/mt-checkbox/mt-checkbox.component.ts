import { Component, OnInit, Input } from '@angular/core';
import {SchemaService} from '../../schema.service';

@Component({
  selector: 'mt-checkbox',
  templateUrl: './mt-checkbox.component.html',
  styleUrls: ['./mt-checkbox.component.scss']
})
export class MtCheckboxComponent implements OnInit {
  @Input() comp: any;

  constructor(public srv: SchemaService) { }

  ngOnInit(): void {
  }

  getValue(): boolean {
    return this.srv.getValueBoolean(this.comp.field);
  }

  getStyle(): string {
    const width = this.comp.width ? `width: ${this.comp.width};` : 'width: 100%';
    return `margin: 10px;${width}`;
  }


  onChange(val: boolean): void {
    this.srv.updateValue(this.comp, val);
  }


}
