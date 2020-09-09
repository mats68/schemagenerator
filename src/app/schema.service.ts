import { Injectable } from '@angular/core';
import { schema, values } from '../api/schema1';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  schema: any;
  values: any;

  getValue(field: string): any {
    return this.values[field];
  }

  updateValue(field: string, val: any) {
    this.values[field] = val
  }

  constructor() { 
    this.schema = schema ;
    this.values = values;
  }
}
