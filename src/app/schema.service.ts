import { Injectable } from '@angular/core';
import { schema, values } from '../api/schema1';

export interface ISettings {
  requiredSuffix: string;
}

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  Schema: any;
  Values: any;
  CompsByName: any;
  CompsByField: any;
  
  Settings: ISettings = {
    requiredSuffix: ' *'
  }

  constructor() {
    this.Schema = schema;
    this.Values = values;

    const fillComps = (arr: any[]) => {
      arr.forEach((item: any) => {
        if (item.name) { this.CompsByName[item.name] = item; }
        if (item.field) { this.CompsByField[item.field] = item; }
        if (item.children) { fillComps(item.children); }
      });
    };

    this.CompsByName = {};
    this.CompsByField = {};
    if (this.Schema.name) { this.CompsByName[this.Schema.name] = this.Schema; }
    fillComps(this.Schema.children);

    this.Schema.children.forEach(item => {
      if (item.type === 'cardgrid') {
        item.rows.forEach(row => {
          row.parent = item;
        });
      }
    });
  }

  getLabel(comp: any): string {
    return comp.label + (comp.required ? this.Settings.requiredSuffix : '');
  }

  getValue(comp: any): any {
    let val;
    if (!comp.field) {
      console.error('field not specified !');
      console.dir(JSON.stringify(comp));
      return undefined;
    }

    if (!comp.parent) {
      val = this.Values[comp.field];
    } else {
      const arr =  this.Values[comp.parent.field];
      const cur = arr.find(item => item[this.gridId] === comp.parent.CurEditId);
      if (cur) {
        val = cur[comp.field];
      }
    }

    if (!val) {
      if (comp.type === 'checkbox') {
        return false;
      }
      if (comp.type === 'cardgrid') {
        return [];
      }
      return '';
    }
    return val;


  }


  updateValue(comp: any, val: any): void {
    //card grid / table 
    if (!comp.parent) {
      this.Values[comp.field] = val;
    } else {
      const arr =  this.Values[comp.parent.field];
      const cur = arr.find(item => item[this.gridId] === comp.parent.CurEditId);
      if (cur) {
        cur[comp.field] = val;
      }
    }
    this.validate(comp);

    if (comp.onChange) {
      comp.onChange(this, val, comp);
    }
  }

  validate(comp: any): void {
    comp.error = '';
    const val = this.Values[comp.field];

    if (!val && comp.required) {
      comp.error = `${comp.label}: Eingabe erforderlich`;
      return;
    }

    if (comp.validate) {
      comp.error = comp.validate(this, comp);
    }
  }

  validateAll() {
    Object.keys(this.CompsByField).forEach(comp => {

      this.validate(this.CompsByField[comp]);
    });
  }


  toggleVisible(name: string, visible: boolean) {
    const c = name ? this.CompsByName[name] : null;
    if (c) {
      c.hidden = !visible;
    }
  }

  // card grid 
  get gridId() {
    return 'id__';
  }

  CurEditId(comp: any) {
    return comp.CurEditId;
  }

  updateCurEditId(comp: any, id: number) {
    if (comp.CurEditId !== id) {
      comp.CurEditId = id;
    }
    
  }

  initGridData(data: any[]) {
    let num = 1;
    data.forEach(item => {
      item[this.gridId] = num;
      num++;
    })
  }

  addGridRecord(data: any[], comp: any): any {
    let max = 0;
    data.forEach(item => {
      max = item[this.gridId] > max ? item[this.gridId] : max;
    })
    max++;
    const rec = {
      [this.gridId]: max
    };
    data.push(rec);
    this.updateCurEditId(comp, max);
    return rec;
  }




}
