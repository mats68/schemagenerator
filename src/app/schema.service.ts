import { Injectable } from '@angular/core';
import { schema, values } from '../api/schema1';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  schema: any;
  private values: any;
  private comps: any; //components by name


  constructor() {
    this.schema = schema;
    this.values = values;

    const fillComps = (arr: any[]) => {
      arr.forEach((item: any) => {
        if (item.name) this.comps[item.name] = item;
        if (item.children) fillComps(item.children);
      })
    }

    this.comps = {};
    if (this.schema.name) this.comps[this.schema.name] = this.schema;
    fillComps(this.schema.children);

  }

  getValues(): any {
    return this.values;
  }

  getValueString(field: string): string {
    return this.values[field] ?? "";
  }

  getValueBoolean(field: string): boolean {
    return this.values[field] ?? false;
  }

  updateValue(comp: any, val: any) {
    this.values[comp.field] = val;

    if (comp.onChange) {
      comp.onChange(this, val, comp);
    }
  }


  toggleVisible(name: string, visible: boolean) {
    var c = name ? this.comps[name] : null;
    if (c) {
      c.hidden = !visible;
    }
  }



}
