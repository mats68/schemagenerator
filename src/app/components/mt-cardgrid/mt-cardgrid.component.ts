// https://medium.com/javascript-in-plain-english/create-a-responsive-card-grid-in-angular-using-flex-layout-3d1b58411e7a
import { Component, OnInit, Input } from '@angular/core';
import { GRIDID } from '../../base-components/constants'
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
  selectedIds: string[] = [];
  showMultiSelect: boolean = false;

  constructor() {


  }

  ngOnInit(): void {
    this.data = this.sm.getValue(this.comp);
    this.sm.initGridData(this.data);
  }

  Insert(): void {
    const row  = this.sm.addGridRecord(this.data, this.comp);
    const id = row[GRIDID];
    this.sm.updateCurEditId(this.comp, id);
    this.selectedIds = [id];
  }

  CopyRow(): void {
    const row = this.sm.getCurRow(this.data, this.comp);
    if (row === null) return;
    
    let newRow  = this.sm.addGridRecord(this.data, this.comp, row);
    const id = newRow[GRIDID];
    this.sm.updateCurEditId(this.comp, id);
    this.selectedIds = [id];
  }

  DeleteRow(): void {
    const row = this.sm.getCurRow(this.data, this.comp);
    if (row === null) return;
    this.data = this.data.filter(r => r[GRIDID] !== row[GRIDID]);

  }

  summary(row: any) {
    return this.comp.summary(row, this.sm);
  }


  rowTitleClick(row: any) {
    const id = this.sm.CurEditId(this.comp) === row[GRIDID] ? 0 : row[GRIDID];
    this.sm.updateCurEditId(this.comp, id);
    if (!this.showMultiSelect) { 
      if (id === 0) {
        this.selectedIds = [];
      } else {
        this.selectedIds = [this.sm.CurEditId(this.comp)];
      }
    }
  }


  // multiSelect() {
  //   this.showMultiSelect = !this.showMultiSelect;
  //   if (!this.showMultiSelect) {
  //     if (this.sm.CurEditId(this.comp) > 0) {
  //       this.selectedIds = [this.sm.CurEditId(this.comp)];  
  //     } else {
  //       this.selectedIds = [];
  //     }
  //   }
  // }

  rowEditing(row: any): boolean {
    return this.sm.CurEditId(this.comp) === row[GRIDID];
  }


}
