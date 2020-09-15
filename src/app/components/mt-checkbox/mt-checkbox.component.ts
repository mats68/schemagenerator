import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';

@Component({
  selector: 'mt-checkbox',
  templateUrl: './mt-checkbox.component.html',
  styleUrls: ['./mt-checkbox.component.scss']
})
export class MtCheckboxComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: any;

  constructor() { }

  ngOnInit(): void {
  }

  getValue(): boolean {
    return this.sm.getValue(this.comp);
  }


  onChange(val: boolean): void {
    this.sm.updateValue(this.comp, val);
  }


}
