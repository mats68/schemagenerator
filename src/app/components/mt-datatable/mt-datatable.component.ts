import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from '../../base/types';

@Component({
  selector: 'mt-datatable',
  templateUrl: './mt-datatable.component.html',
  styleUrls: ['./mt-datatable.component.scss']
})
export class MtDatatableComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  data: any[] = [];
  subsm: SchemaManager;
  currow: any;

  toolbar: IComponent;
  constructor() { }

  ngOnInit(): void {
    this.subsm = new SchemaManager(this.comp);

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
        onClick: () => {this.CopyRow()}
      },
    ]
      
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

  isDisabled(): boolean {
    return !this.currow;
  }

}
