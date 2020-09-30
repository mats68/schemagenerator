import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IValueType, SchemaManager } from 'src/app/base/schemaManager';
import { IComponent } from 'src/app/base/types';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'mt-datatable',
  templateUrl: './mt-datatable.component.html',
  styleUrls: ['./mt-datatable.component.scss']
})
export class MtDatatableComponent implements OnInit, OnChanges {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  @Input() curRowInd: number;
  @Input() data: any;
  // data: any[] = [];
  subsm: SchemaManager;
  currow: any;
  captions: string[];

  fields: IComponent[];
  toolbar: IComponent;
  
  constructor() { }

  ngOnInit(): void {
    this.subsm = new SchemaManager(this.sm, this.sm.Settings);
    this.subsm.InitSchema(this.comp);

    this.fields = this.comp.children.filter(c => c.field);

    this.captions = this.fields.map(c => {
      const lb = this.sm.getPropValue(c, 'label');
      return lb || 'no label specified!';
    })

    
    this.toolbar = {
      type: 'toolbar',
      label: this.comp.label,
      color: this.comp.toolbarColor,
      children: [
        {
          type: 'button',
          kind: 'minifab',
          tooltip: this.sm.Strings.ds_ins,
          icon: 'add',
          color: 'primary',
          onClick: () => { this.Insert() }
        },
        {
          type: 'button',
          kind: 'minifab',
          tooltip: this.sm.Strings.ds_copy,
          icon: 'content_copy',
          color: 'primary',
          disabled: () => { return this.isDisabled() },
          onClick: () => { this.CopyRow() }
        },
        {
          type: 'button',
          kind: 'minifab',
          tooltip: this.sm.Strings.ds_del,
          icon: 'delete',
          color: 'primary',
          disabled: () => { return this.isDisabled() },
          onClick: () => { this.DeleteRow() }
        },
      ]

    }
  }

  ngOnChanges() {
    // this.data = this.sm.getValue(this.comp);
    if (!isNaN(this.curRowInd) && this.data.length > this.curRowInd) {
      this.InitCurRow(this.data[this.curRowInd]);
    }
  }

  Insert(): void {
    const row = {};
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
      // this.curRowInd = -1;
    } else {
      this.currow = row;
      const ind = this.data.findIndex(r => r === row);
      // if (this.curRowInd !== ind) this.curRowInd = ind;
      this.subsm.InitValues(row, ind);
    }
  }


  summary(row: any): IComponent {
    const summary: any = this.comp.summary;
    const ret = summary(this.sm, this.comp, row);
    const typ: IValueType = this.sm.checkValueType(ret);
    if (typ === IValueType.string) {
      return {
        type: 'label',
        label: ret
      }
    } else if (typ === IValueType.component) {
      return ret;
    } else {
      console.error('summary function must return a string or a component', this.comp);
    }
  }

  isDisabled(): boolean {
    return !this.currow;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.comp.dragdrop) {
      moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    }
  }

}
