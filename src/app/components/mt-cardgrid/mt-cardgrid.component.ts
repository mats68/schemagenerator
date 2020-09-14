// https://medium.com/javascript-in-plain-english/create-a-responsive-card-grid-in-angular-using-flex-layout-3d1b58411e7a
import { Component, OnInit, Input } from '@angular/core';
import { SchemaService } from '../../schema.service';

@Component({
  selector: 'mt-cardgrid',
  templateUrl: './mt-cardgrid.component.html',
  styleUrls: ['./mt-cardgrid.component.scss']
})
export class MtCardgridComponent implements OnInit {
  @Input() comp: any;
  data: any[] = [];
  selectedIds: string[] = [];
  showMultiSelect: boolean = false;

  constructor(public srv: SchemaService) {


  }

  ngOnInit(): void {
    this.data = this.srv.getValue(this.comp);
    this.srv.initGridData(this.data);
  }

  Insert(): void {
    this.srv.addGridRecord(this.data, this.comp);
  }

  summary(row: any) {
    return this.comp.summary(row, this.srv);
  }


  rowTitleClick(row: any) {
    const id = this.srv.CurEditId(this.comp) === row[this.srv.gridId] ? 0 : row[this.srv.gridId];
    this.srv.updateCurEditId(this.comp, id);
    if (!this.showMultiSelect) { 
      if (id === 0) {
        this.selectedIds = [];
      } else {
        this.selectedIds = [this.srv.CurEditId(this.comp)];
      }
    }
  }

  multiSelect() {
    this.showMultiSelect = !this.showMultiSelect;
    if (!this.showMultiSelect) {
      if (this.srv.CurEditId(this.comp) > 0) {
        this.selectedIds = [this.srv.CurEditId(this.comp)];  
      } else {
        this.selectedIds = [];
      }
    }
  }

  rowEditing(row: any): boolean {
    return this.srv.CurEditId(this.comp) === row[this.srv.gridId];
  }


}
