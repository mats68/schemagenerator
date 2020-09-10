import { Injectable } from '@angular/core';
import { schema, values } from '../api/schema1';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  Schema: any;
  Values: any;
  CompsByName: any;
  CompsByField: any;

  constructor() {
    this.Schema = schema;
    this.Values = values;

    const fillComps = (arr: any[]) => {
      arr.forEach((item: any) => {
        if (item.name) this.CompsByName[item.name] = item;
        if (item.field) this.CompsByField[item.field] = item;
        if (item.children) fillComps(item.children);
      })
    }

    this.CompsByName = {};
    this.CompsByField = {};
    if (this.Schema.name) this.CompsByName[this.Schema.name] = this.Schema;
    fillComps(this.Schema.children);

  }

  getValueString(field: string): string {
    return this.Values[field] ?? "";
  }

  getValueBoolean(field: string): boolean {
    return this.Values[field] ?? false;
  }

  updateValue(comp: any, val: any): void {
    this.Values[comp.field] = val;
    this.validate(comp);

    if (comp.onChange) {
      comp.onChange(this, val, comp);
    }
  }

  validate(comp: any): void {
    comp.error = '';
    const val = this.Values[comp.field];

    if (!val && comp.required) {
      comp.error = `${comp.field} is required`;
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
    var c = name ? this.CompsByName[name] : null;
    if (c) {
      c.hidden = !visible;
    }
  }



}
