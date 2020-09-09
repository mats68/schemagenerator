import { Injectable } from '@angular/core';
import { schema, values } from '../api/schema1';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  schema: any;
  values: any;

  getValueString(field: string): string {
    return this.values[field] ?? "";
  }

  getValueBoolean(field: string): boolean {
    return this.values[field] ?? false;
  }

  updateValue(field: string, val: any) {
    this.values[field] = val
  }

  constructor() { 
    this.schema = schema ;
    this.values = values;
  }
}
