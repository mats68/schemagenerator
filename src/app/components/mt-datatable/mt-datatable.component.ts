import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from '../../base/types';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'mt-datatable',
  templateUrl: './mt-datatable.component.html',
  styleUrls: ['./mt-datatable.component.scss']
})
export class MtDatatableComponent implements OnInit, OnChanges {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  @Input() curRowInd: number;
  data: any[] = [];
  subsm: SchemaManager;
  currow: any;

  toolbar: IComponent;
  constructor() { }

  ngOnInit(): void {
    this.subsm = new SchemaManager(this.sm, this.sm.Settings);
    this.subsm.InitSchema(this.comp);

    this.data = this.sm.getValue(this.comp);

    this.toolbar = {
      type: 'toolbar',
      label: this.comp.label,
      color: this.comp.toolbarColor,
      toolbarItems: [
      {
        label: this.sm.Strings.ds_ins,
        icon: 'add',
        color: 'primary',
        onClick: () => {this.Insert()}
      },
      {
        label: this.sm.Strings.ds_copy,
        icon: 'content_copy',
        color: 'primary',
        disabled: () => {return this.isDisabled()},
        onClick: () => {this.CopyRow()}
      },
      {
        label: this.sm.Strings.ds_del,
        icon: 'delete',
        color: 'primary',
        disabled: () => {return this.isDisabled()},
        onClick: () => {this.DeleteRow()}
      },
    ]
      
    }
  }

  ngOnChanges() {
    if (!isNaN(this.curRowInd) && this.data.length > this.curRowInd) {
      this.InitCurRow(this.data[this.curRowInd]);
    }
  }

  Insert(): void {
    const row  = {};
    this.data.push(row);
    this.sm.updateValue(this.comp, this.data);
    this.InitCurRow(row);
  }

  CopyRow(): void {
    if (!this.currow) return;
    const newrow = JSON.parse(JSON.stringify(this.currow));
    this.data.push(newrow);
    this.sm.updateValue(this.comp, this.data);
    this.InitCurRow(newrow);
  }

  DeleteRow(): void {
    if (!this.currow) return;
    this.data = this.data.filter(r => r !== this.currow);
    this.sm.updateValue(this.comp, this.data);
    this.sm.removeAllErrors();
    if (this.sm.AllValidated) {
      this.sm.validateAll();
    }
    this.InitCurRow(null);

  }

  toggleExpand(row: any) {

    this.InitCurRow(row);
  }


  InitCurRow(row: any) {
    if (row === null || this.currow === row) {
      this.currow = null;
      this.curRowInd = -1;
    } else {
      this.currow = row;
      const ind = this.data.findIndex(r => r === row);
      if (this.curRowInd !== ind) this.curRowInd = ind;
      this.subsm.InitValues(row, ind);
    } 
  }


  summary(row: any) {
    return this.comp.summary(this.sm, this.comp, row);
  }

  isDisabled(): boolean {
    return !this.currow;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

}
