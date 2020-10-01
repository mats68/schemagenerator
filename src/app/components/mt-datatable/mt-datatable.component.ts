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
  currow: any;
  captions: string[];

  fields: IComponent[];
  toolbar: IComponent;
  
  constructor() { }

  ngOnInit(): void {
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
          disabled: () => { return this.hasCurRow() },
          onClick: () => { this.CopyRow() }
        },
        {
          type: 'button',
          kind: 'minifab',
          tooltip: this.sm.Strings.ds_del,
          icon: 'delete',
          color: 'primary',
          disabled: () => { return this.hasCurRow() },
          onClick: () => { this.DeleteRow() }
        },
      ]

    }
  }

  ngOnChanges() {
    const typ = this.sm.checkValueType(this.curRowInd);
    if (typ === IValueType.number && this.data.length > this.curRowInd) {
      this.InitCurRow(this.curRowInd);
    }
  }

  Insert(): void {
    const row = {};
    const len = this.data.push(row);
    this.sm.updateValue(this.comp, this.data);
    this.sm.InitValuesArray(this.comp, this.data[len-1]);
    this.InitCurRow(len-1);
  }

  CopyRow(): void {
    if (!this.currow) return;
    const newrow = JSON.parse(JSON.stringify(this.currow));
    const len = this.data.push(newrow);
    this.sm.updateValue(this.comp, this.data);
    this.InitCurRow(len-1);
  }

  DeleteRow(): void {
    if (!this.currow) return;
    this.data = this.data.filter(r => r !== this.currow);
    this.sm.updateValue(this.comp, this.data);
    this.sm.removeAllErrors();
    if (this.sm.AllValidated) {
      this.sm.validateAll();
    }
    this.InitCurRow(-1);

  }

  toggleExpand(row: any) {
    let ind = this.data.findIndex(r => r === row);
    if (this.comp.curRowInd === ind) ind = -1; 
    this.InitCurRow(ind);
  }


  InitCurRow(rowInd: number) {
    if (rowInd === -1) {
      this.currow = null;
      this.comp.curRowInd = -1;
    } else {
      if (this.comp.curRowInd !== rowInd) this.comp.curRowInd = rowInd;
      this.currow = this.data[rowInd];
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

  hasCurRow(): boolean {
    return !this.currow;
  }

  hasData(): boolean {
    let has = false;
    const typ = this.sm.checkValueType(this.data);
    if (typ === IValueType.array && this.data.length > 0) {
      has = true;
    }
    return has;
  }

  getCellValue(comp: IComponent, arrayInd: number): string {
    return this.sm.getValue(comp,this.sm.Values,arrayInd);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.comp.dragdrop) {
      moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    }
  }

}
