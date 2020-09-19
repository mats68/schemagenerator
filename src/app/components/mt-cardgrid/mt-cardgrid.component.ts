import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';
import { IComponent } from 'src/app/base-components/types';

@Component({
  selector: 'mt-cardgrid',
  templateUrl: './mt-cardgrid.component.html',
  styleUrls: ['./mt-cardgrid.component.scss']
})
export class MtCardgridComponent implements OnInit, OnChanges {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  data: any[] = [];
  subsm: SchemaManager;
  currow: any;

  constructor() {

  }

  ngOnInit(): void {
    this.data = this.sm.getValue(this.comp);
    this.subsm = new SchemaManager(this.comp);
  }

  ngOnChanges() {
  }

  Insert(): void {
    const row  = {};
    this.subsm.InitValues(row);
    this.currow = row;
    this.data.push(row);
    this.sm.updateValue(this.comp, this.data);
  }

  CopyRow(): void {
    if (!this.currow) return;
    const newrow = JSON.parse(JSON.stringify(this.currow));
    this.data.push(newrow);
    this.sm.updateValue(this.comp, this.data);
    this.currow = newrow;
    this.subsm.InitValues(newrow);
  }

  DeleteRow(): void {
    if (!this.currow) return;
    this.data = this.data.filter(r => r !== this.currow);
    this.sm.updateValue(this.comp, this.data);
    this.currow = null;
  }

  summary(row: any) {
    return this.comp.summary(this.sm, this.comp, row);
  }

  rowTitleClick(row: any) {
    if (this.currow !== row) {
      this.currow = row;
      this.subsm.InitValues(row);
    } else {
      this.currow = null;
    }
  }

}
