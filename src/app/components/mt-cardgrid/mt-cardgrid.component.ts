// https://medium.com/javascript-in-plain-english/create-a-responsive-card-grid-in-angular-using-flex-layout-3d1b58411e7a
import { Component, OnInit, Input, OnChanges } from '@angular/core';
// import { GRIDID } from '../../base-components/constants'
import { SchemaManager } from '../../base-components/schemaManager';

@Component({
  selector: 'mt-cardgrid',
  templateUrl: './mt-cardgrid.component.html',
  styleUrls: ['./mt-cardgrid.component.scss']
})
export class MtCardgridComponent implements OnInit, OnChanges {
  @Input() sm: SchemaManager;
  @Input() comp: any;
  data: any[] = [];
  subsm: SchemaManager;
  currow: any;

  constructor() {

  }

  ngOnInit(): void {
    this.data = this.sm.getValue(this.comp);
    this.subsm = new SchemaManager(this.comp);
  }

  ngOnChanges(changes: any) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      console.log('cur', cur, 'prev', prev)
      //con.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
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
    this.currow = newrow;
    this.data.push(newrow);
    this.sm.updateValue(this.comp, this.data);
  }

  DeleteRow(): void {
    if (!this.currow) return;
    this.currow = null;
    this.data = this.data.filter(r => r !== this.currow);
    this.sm.updateValue(this.comp, this.data);
  }

  summary(row: any) {
    return this.comp.summary(row, this.sm);
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
