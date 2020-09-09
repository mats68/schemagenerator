import { Injectable } from '@angular/core';
import { schema } from '../api/schema1';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  schema: any;

  constructor() { this.schema = schema }
}
