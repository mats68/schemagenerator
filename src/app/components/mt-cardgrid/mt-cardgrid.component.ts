// https://medium.com/javascript-in-plain-english/create-a-responsive-card-grid-in-angular-using-flex-layout-3d1b58411e7a
import { Component, OnInit, Input } from '@angular/core';
// import { GRIDID } from '../../base-components/constants'
import { SchemaManager } from '../../base-components/schemaManager';

@Component({
  selector: 'mt-cardgrid',
  templateUrl: './mt-cardgrid.component.html',
  styleUrls: ['./mt-cardgrid.component.scss']
})
export class MtCardgridComponent implements OnInit {
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

  Insert(): void {
    const row  = {};
    this.data.push(row);
    this.subsm.InitValues(row);
    this.currow = row;
  }

  CopyRow(): void {
    if (!this.currow) return;
    const newrow = JSON.parse(JSON.stringify(this.currow));
    this.data.push(newrow);
    this.currow = newrow;
  }

  DeleteRow(): void {
    if (!this.currow) return;
    this.data = this.data.filter(r => r !== this.currow);
    this.currow = null;
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
